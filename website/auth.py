from flask import Blueprint

auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return "<p>login</p>"

@auth.route('/logout')
def logout():
    return "<p>logout</p>"

@auth.route('/sign-up')
def sign_up():
    return "<p>Sign Up</p>"

@auth.route('/home')
def home():
    return "<p>home</p>"

@auth.route('/game')
def game():
    return "<p>game app</p>"

@auth.route('/scoreboard')
def scoreboard():
    return "<p>scoreboard</p>"