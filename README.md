# Animation-Game
# First database setup using local server host

# flask installs (works in vscode terminal)

pip install flask

pip install flask-login

pip install flask-sqlalchemy

# install virtualization (used linux here)

python3 -m venv venv (or python depends on os)

# to fix errors in activate file - linux
# go to same folder in terminal

sudo apt-get install dos2unix

dos2unix Scripts/activate

sed -i 's/\r$//' Scripts/activate

source Scripts/activate

# currently two setups are here which will be migrated 
# to two seperate repositories including this one

python app.py to run (similar to all python files, python3 in ubuntu)

app.py (standalone script using flask and no venv)

main.py (uses init, auth, models, views)
