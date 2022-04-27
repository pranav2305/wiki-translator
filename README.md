#  Wiki Translator

## Tech Stack
- Django Rest Framework
- Next.js
- SQLite

## Setup Instructions

1. Clone the repository <br>
`git clone `

### Backend

1. cd into the root directory for the backend <br>
`cd backend/wiki_translator/`

2. Create a virtual environment <br>
`python3 -m venv venv`

3. Install requirements <br>
`pip install -r requirements.txt`

4. Make migrations <br>
`python3 manage.py makemigrations`

5. Migrate <br>
`python3 manage.py migrate`

6. Run the server <br>
`python3 manage.py runserver`

The backend will be deployed [here](http://127.0.0.1:8000/).

### Frontend

1. cd into the root driectory for the frontend <br>
`cd frontend/wiki_translator/`

2. Install the packages <br>
`npm i`

3. Run the server in development mode <br>
`npm run dev`

4. Open the constants.js file in the utils directory, comment the existing Host and DomainURL and uncomment the other ones.

The frontend will be deployed [here](http://127.0.0.1:3000/).