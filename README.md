# DNA Sequence Machine Learning Classifier
A website to predict whether a DNA sequence is a promoter or not.

<div align="center">
  <img src="frontend/public/landingpage.png" alt="DNA Sequence Classifier App" width="600"/>
</div>

## Description
This is a DNA Sequence classifier deployed on a website using React and FastAPI. It relies on a model as the backend logic to output to the user whether a DNA sequence is a promoter or not. The model, programmed with the scikit library, was trained on the Molecular Biology Promoter Gene Sequences dataset (from UCI Machine Learning Repository). Additionally, this model has reached a 95% accuracy in test sets on 6-mer sequences. 

## Tech Stack
- Frontend: React, Vite, TailwindCSS
- Backend: Python, FastAPI, scikit-learn

## Running on Browser

Website: https://dna-seq-classifier-ryr2.vercel.app/

## Running Locally for Development (without docker)

**1. Start the Backend (FastAPI)**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
*The backend will be running at `http://localhost:8000`.*

**2. Start the Frontend (React)**
```bash
cd frontend
npm install
npm run dev
```
*The frontend will be running at `http://localhost:5173`.*

## Running on Docker

```bash
# Ensure in the root directory of the project
docker-compose up --build
```
Access the application in your browser at `http://localhost:5173`.

