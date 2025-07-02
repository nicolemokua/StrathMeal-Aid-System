from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from .models import db, User, Application, Voucher, Donation, Feedback

bp = Blueprint('api', __name__)

# --- Auth ---
@bp.route('/api/register', methods=['POST'])
def register():
    data = request.json
   
    password = data.get('password', None)
    if password is None and data.get('role', 'student') == 'student':
        
        password = "nopassword"
    elif not password:
        return jsonify({'message': 'Password is required'}), 400

    user = User(
        name=data['name'],
        email=data['email'],
        password=password, 
        phone=data.get('phone'),
        course=data.get('course'),
        year_of_study=data.get('year_of_study'),
        role=data.get('role', 'student')
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    if user:
        return jsonify({'message': 'Login successful', 'user': {
            'id': user.id,
            'name': user.name,
            'role': user.role,
            'email': user.email,  
            'phone': user.phone,
            'course': user.course,
            'year_of_study': user.year_of_study
        }})
    return jsonify({'message': 'Invalid credentials'}), 401

@bp.route('/api/admin-login', methods=['POST'])
def admin_login():
    data = request.json
    admin_email = "nicolemokua08@gmail.com"
    admin_password = "nimo123"
    if data.get("email") == admin_email and data.get("password") == admin_password:
        return jsonify({
            "message": "Admin login successful",
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

@bp.route('/api/apply', methods=['POST'])
@jwt_required()  # If using JWT for authentication
def apply():
    data = request.json
    user_email = get_jwt_identity()  # Or however you get the logged-in user
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Only use eligibility fields from data, rest from user
    application_data = {
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "course": user.course,
        "year_of_study": user.year_of_study,
        "fee_balance": data.get("fee_balance"),
        "parent_guardian_unemployed": data.get("parent_guardian_unemployed"),
        "has_siblings": data.get("has_siblings"),
        "has_scholarship": data.get("has_scholarship"),
    }
    

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