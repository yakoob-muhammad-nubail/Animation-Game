from flask import Blueprint

views = Blueprint('views', __name__)

@views.route('/login')
def login():
    return "<p>login</p>"

@views.route('/logout')
def logout():
    return "<p>logout</p>"

@views.route('/sign-up')
def sign_up():
    return "<p>sign Up</p>"

@views.route('/home')
def home():
    return "<p>home</p>"

@views.route('/game')
def game():
    return "<p>game app</p>"