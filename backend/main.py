from fastapi import FastAPI
from pydantic import BaseModel
import pickle

# Use of FastAPI for eaier API writing + faster + more robust.
app = FastAPI()

# Load the saved pkls
with open('models/dna_model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('models/vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

#Define the incoming data from React
class DNAData(BaseModel):
    sequence: str

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


