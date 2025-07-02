from backend import create_app, db
from backend.models import User

app = create_app()
with app.app_context():
    db.create_all()
    # Hardcode admin credentials
    admin_email = "nicolemokua08@gmail.com"
    admin_password = "nimo123"  
    admin = User.query.filter_by(email=admin_email, role="admin").first()
    if not admin:
        admin = User(
            name="Admin",
            email=admin_email,
            password=admin_password,
            role="admin"
        )
        db.session.add(admin)
        db.session.commit()
        print("Admin user created.")
    else:
        print("Admin user already exists.")
