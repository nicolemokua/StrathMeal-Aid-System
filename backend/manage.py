from backend import create_app, db
from flask_migrate import Migrate
from backend.models import User, Application, Voucher, Donation, Feedback

app = create_app()
migrate = Migrate(app, db)

# Optional: Shell context for flask shell
@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "User": User,
        "Application": Application,
        "Voucher": Voucher,
        "Donation": Donation,
        "Feedback": Feedback,
    }

if __name__ == "__main__":
    app.run(debug=True)