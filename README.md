#  Wiki Translator

Backend - https://wiki-translator.pranav2305.repl.co/ <br>
Frontend - https://wiki-translator-1.pranav2305.repl.co/


## About
This project is essentially built for effeciently managing the process of translation of a wikipedia page. <br>
This project provides an interface for people to put up titles of wikipedia pages that they want to get translated. Once a new project is created the creator can add more people to the project either as Annotators or Managers. The annotators only have permission to update the translated sentences whereas the Managers also have the permission to add other people to the project.

## Tech Stack
- Django Rest Framework
- Next.js
- SQLite3

## Setup Instructions

1. Clone the repository <br>
`git clone https://github.com/pranav2305/wiki-translator.git`

2. cd to the base directory of the project <br>
`cd wiki_translator/`

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

The backend will be deployed [here](http://127.0.0.1:8000/). <br>
**Note: For windows use `python` instead of `python3` in all the commands.**

### Frontend

1. cd into the root driectory for the frontend <br>
`cd frontend/wiki_translator/`

2. Install the packages <br>
`npm i`

3. Run the server in development mode <br>
`npm run dev`

4. Open the constants.js file in the utils directory, comment the existing Host and DomainURL and uncomment the other ones.

The frontend will be deployed [here](http://127.0.0.1:3000/).