from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    phone = db.Column(db.String(20))
    course = db.Column(db.String(120))
    year_of_study = db.Column(db.Integer)
    role = db.Column(db.String(20), default="student")  # student, donor, admin, cafeteria

    applications = db.relationship('Application', backref='user', lazy=True)
    vouchers = db.relationship('Voucher', backref='user', lazy=True)
    donations = db.relationship('Donation', backref='donor', lazy=True)
    feedbacks = db.relationship('Feedback', backref='user', lazy=True)

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.String(20))
    status = db.Column(db.String(20))  # e.g., Approved, Rejected, Pending
    remarks = db.Column(db.String(255))

class Voucher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(32), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    meal_type = db.Column(db.String(20))  # Breakfast, Lunch, Dinner
    valid_until = db.Column(db.String(20))
    status = db.Column(db.String(20))  # e.g., Available, Used

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    donor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(20))

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    date = db.Column(db.String(20))