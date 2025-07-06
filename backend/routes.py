from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token
from .models import db, User, Application, Voucher, Donation, Feedback
import datetime

bp = Blueprint('api', __name__)

# --- Auth ---
@bp.route('/api/register', methods=['POST'])
def register():
    data = request.json
    student_id = data.get("student_id")
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    course = data.get("course")
    year_of_study = data.get("year_of_study")

    # Validate required fields
    if not student_id or not name or not email or not password:
        return jsonify({"message": "Missing required fields"}), 400

    # Check for uniqueness
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered"}), 400
    if User.query.filter_by(student_id=student_id).first():
        return jsonify({"message": "Student ID already registered"}), 400

    user = User(
        student_id=student_id,
        name=name,
        email=email,
        password=password,
        phone=phone,
        course=course,
        year_of_study=year_of_study
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Registration successful"}), 201

@bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    if user:
        access_token = create_access_token(identity=user.email)
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'userType': user.role,  # <-- Add this line
            'user': {
                'id': user.id,
                'name': user.name,
                'role': user.role,
                'email': user.email,  
                'phone': user.phone,
                'course': user.course,
                'year_of_study': user.year_of_study
            }
        })
    return jsonify({'message': 'Invalid credentials'}), 401

from flask_jwt_extended import create_access_token

@bp.route('/api/admin-login', methods=['POST'])
def admin_login():
    data = request.json
    admin_email = "nicolemokua08@gmail.com"
    admin_password = "nimo123"
    if data.get("email") == admin_email and data.get("password") == admin_password:
        access_token = create_access_token(identity=admin_email)
        return jsonify({
            "message": "Admin login successful",
            "access_token": access_token,
            "user": {
                "name": "Admin",
                "role": "admin",
                "email": admin_email
            }
        }), 200
    return jsonify({"message": "Invalid admin credentials"}), 401

# --- Applications ---
@bp.route('/api/applications', methods=['POST'])
def create_application():
    data = request.json
    app = Application(
        user_id=data['user_id'],
        date=data['date'],
        status='Pending',
        remarks=''
    )
    db.session.add(app)
    db.session.commit()
    return jsonify({'message': 'Application submitted'}), 201

@bp.route('/api/applications/<int:user_id>', methods=['GET'])
def get_applications(user_id):
    apps = Application.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': a.id, 'date': a.date, 'status': a.status, 'remarks': a.remarks
    } for a in apps])

@bp.route('/api/applications', methods=['GET'])
@jwt_required()
def get_all_applications():
    # Only allow admin (add your admin check logic)
    apps = (
        db.session.query(Application, User)
        .join(User, Application.user_id == User.id)
        .order_by(Application.date.desc())
        .all()
    )
    result = []
    for app, user in apps:
        result.append({
            "id": app.id,
            "name": user.name,
            "email": user.email,
            "status": app.status,
            "date": app.date,
        })
    return jsonify(result)

def get_current_semester(date=None):
    """Returns (year, semester_number) for a given date."""
    if date is None:
        date = datetime.date.today()
    year = date.year
    month = date.month
    if 4 <= month <= 7:
        return (year, 1)  # Semester 1: April-July
    elif 8 <= month <= 12:
        return (year, 2)  # Semester 2: August-December
    else:
        # Jan-March: treat as previous year's Semester 2 (or adjust as needed)
        return (year - 1, 2)

def get_semester_from_date(date_str):
    """Parse date string and return (year, semester_number)."""
    try:
        date = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
    except Exception:
        date = datetime.date.today()
    return get_current_semester(date)

@bp.route('/api/apply', methods=['POST'])
@jwt_required()
def apply():
    data = request.json
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    today = datetime.date.today()
    current_year, current_sem = get_current_semester(today)

    # Find latest application for this user
    last_app = Application.query.filter_by(user_id=user.id).order_by(Application.id.desc()).first()
    if last_app:
        last_year, last_sem = get_semester_from_date(last_app.date or str(today))
        if (last_year, last_sem) == (current_year, current_sem):
            return jsonify({"message": "You have already applied this semester. Please wait for the next semester to re-apply."}), 400

    # --- Auto-approval logic ---
    # Example: use the same logic as frontend eligibility
    score = 0
    if data.get("fee_balance") is not None and float(data["fee_balance"]) <= 30000:
        score += 30
    if data.get("parent_guardian_unemployed"):
        score += 30
    if data.get("has_siblings"):
        score += 10
    if data.get("has_scholarship"):
        score -= 20

    if score >= 70:
        status = "Approved"
        remarks = "Highly eligible. Application auto-approved."
    elif score >= 40:
        status = "Approved"
        remarks = "Eligible. Application auto-approved."
    else:
        status = "Rejected"
        remarks = "Not eligible based on provided information."

    application = Application(
        user_id=user.id,
        date=str(today),
        status=status,
        remarks=remarks
    )
    db.session.add(application)
    db.session.commit()

    return jsonify({
        "message": f"Application {status.lower()}",
        "status": status,
        "remarks": remarks
    }), 201

@bp.route('/api/application-eligibility', methods=['GET'])
@jwt_required()
def application_eligibility():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"eligible": False, "reason": "User not found"}), 404

    today = datetime.date.today()
    current_year, current_sem = get_current_semester(today)
    last_app = Application.query.filter_by(user_id=user.id).order_by(Application.id.desc()).first()
    if last_app:
        last_year, last_sem = get_semester_from_date(last_app.date or str(today))
        if (last_year, last_sem) == (current_year, current_sem):
            if last_app.status == "Pending":
                return jsonify({
                    "eligible": False,
                    "reason": "Your application is pending review.",
                    "last_status": "Pending",
                    "remarks": last_app.remarks or ""
                })
            elif last_app.status == "Approved":
                return jsonify({
                    "eligible": False,
                    "reason": "Your application has already been approved for this semester.",
                    "last_status": "Approved",
                    "remarks": last_app.remarks or ""
                })
            elif last_app.status == "Rejected":
                return jsonify({
                    "eligible": False,
                    "reason": "You were rejected this semester. Please wait for the next semester.",
                    "last_status": "Rejected",
                    "remarks": last_app.remarks or ""
                })
    # If no application for this semester
    return jsonify({
        "eligible": True,
        "reason": "You have not applied for this semester.",
        "last_status": None,
        "remarks": ""
    })

# --- Vouchers ---
@bp.route('/api/vouchers/<int:user_id>', methods=['GET'])
def get_vouchers(user_id):
    vouchers = Voucher.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': v.id, 'code': v.code, 'meal_type': v.meal_type, 'valid_until': v.valid_until, 'status': v.status
    } for v in vouchers])

@bp.route('/api/vouchers/use', methods=['POST'])
def use_voucher():
    data = request.json
    voucher = Voucher.query.filter_by(code=data['code'], user_id=data['user_id']).first()
    if voucher and voucher.status == 'Available':
        voucher.status = 'Used'
        db.session.commit()
        return jsonify({'message': 'Voucher used'})
    return jsonify({'message': 'Invalid or already used voucher'}), 400

# --- Donations ---
@bp.route('/api/donations', methods=['POST'])
def make_donation():
    data = request.json
    donation = Donation(
        donor_id=data['donor_id'],
        amount=data['amount'],
        date=data['date']
    )
    db.session.add(donation)
    db.session.commit()
    return jsonify({'message': 'Donation received'}), 201

@bp.route('/api/donations/<int:donor_id>', methods=['GET'])
def get_donations(donor_id):
    donations = Donation.query.filter_by(donor_id=donor_id).all()
    return jsonify([{
        'id': d.id, 'amount': d.amount, 'date': d.date
    } for d in donations])

# --- Feedback ---
@bp.route('/api/feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    feedback = Feedback(
        user_id=data['user_id'],
        message=data['message'],
        date=data['date']
    )
    db.session.add(feedback)
    db.session.commit()
    return jsonify({'message': 'Feedback submitted'}), 201

@bp.route('/api/feedback/<int:user_id>', methods=['GET'])
def get_feedback(user_id):
    feedbacks = Feedback.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': f.id, 'message': f.message, 'date': f.date
    } for f in feedbacks])

# --- User Management (Admin) ---
@bp.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': u.id, 'name': u.name, 'email': u.email, 'role': u.role
    } for u in users])

@bp.route('/api/user-profile', methods=['GET'])
def user_profile():
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'user': None}), 404
    return jsonify({'user': user.to_dict()})

from flask_jwt_extended import jwt_required, get_jwt_identity

@bp.route('/api/student-dashboard', methods=['GET'])
@jwt_required()
def student_dashboard():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    last_app = Application.query.filter_by(user_id=user.id).order_by(Application.id.desc()).first()
    if not last_app or last_app.status != "Approved":
        return jsonify({"error": "Not authorized"}), 403
    # ...return dashboard data...