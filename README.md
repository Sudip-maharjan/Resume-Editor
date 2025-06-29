
# Resume-Editor

A web-based Resume Editor that lets users: Upload and edit their resumes & Enhance sections using a mock AI backend

## Setup Instruction
Steps to run both frontend and backend locally.
### 1. Clone the Repository
git clone https://github.com/Sudip-maharjan/Resume-Editor.git

### 2. Backend
**a. Navigate to backend directory:**<br>
cd Resume-Editor/backend

**b. Create and run a virtual environment:**<br>
python -m venv venv
venv\Scripts\activate

**c. Install required dependencis:**<br>
pip install -r requirements.txt

**d. Start the FastAPI server:**<br>
uvicorn main:app --reload --port 8000

The backend will be running at: http://localhost:8000

###3. Frontend
**a. Open a new terminal window, then navigat to the frontend directory:**<br>
cd Resume-Editor/frontend

**b. Intsall the dependencies:**<br>
npm install

**c. Start the React app:**<br>
npm run dev

The frontend will be running at: http://localhost:5173<br>
If not either run: npm run dev -- --port=5173<br>
Or, change the port number in the main.py line 95
