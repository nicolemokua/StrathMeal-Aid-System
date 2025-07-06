from backend import create_app, db
from backend.models import User, Application

app = create_app()
with app.app_context():
    names_to_delete = ["Tanui Kipkoskei", "Joy Kendi", "Moses Mathu"]
    users = User.query.filter(User.name.in_(names_to_delete)).all()
    user_ids = [u.id for u in users]
    deleted = Application.query.filter(Application.user_id.in_(user_ids)).delete(synchronize_session=False)
    db.session.commit()
    print(f"Deleted {deleted} applications for: {', '.join(names_to_delete)}")