from fastapi import FastAPI
from pydantic import BaseModel, field_validator
import pickle
from fastapi.middleware.cors import CORSMiddleware
import re 

# Use of FastAPI for eaier API writing + faster + more robust.
app = FastAPI()

#Middleware
#Allows frontend of our app to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "https://dna-seq-classifier-ryr2.vercel.app",
        "https://dna-seq-classifier.onrender.com"
    ], # Allow local dev and Vercel and Render production
    allow_credentials=True,
    allow_methods=["*"], # Allow POST, GET, etc.
    allow_headers=["*"],
)

# Load the saved pkls
with open('models/dna_model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('models/vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

#Define the incoming data from React
class DNAData(BaseModel):
    sequence: str
    
    # Error Checking
    @field_validator('sequence')
    def validate_dna(cls, v):
        # Clean the string: remove spaces and make lowercase
        cleaned = v.replace(" ", "").strip().lower()
        
        # Check if the sequence only contains valid DNA characters (a, c, g, t)
        if not re.match("^[acgt]+$", cleaned):
            raise ValueError('Sequence must only contain A, C, G, or T')
        
        # Ensure the sequence is long enough for the 6-mer model
        if len(cleaned) < 50:
            raise ValueError('Sequence must be at least 50 base pairs long')
            
        return cleaned

#Health Check - Checking if listening
@app.get("/")
def health_check():
    return {"status": "API is online and ready for DNA sequences."}

#Create the endpoint that React will send the POST request to
@app.post("/predict")
def predict_promoter(data: DNAData):
    # Process the raw string into 6-mers using the saved vectorizer (vectorizer.pkl)
    kmer_features = vectorizer.transform([data.sequence])
    
    # Run the prediction
    prediction = model.predict(kmer_features)
    
    # Format the response
    result = "Promoter (+)" if prediction[0] == 1 else "Non-Promoter (-)"
    
    #Packages into a JSON to let the frontend use it later.
    return {"prediction": result, "status": 200}


