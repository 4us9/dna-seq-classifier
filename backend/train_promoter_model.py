import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import pickle

# 1. Load and Clean the Data (We are preprocessing before training with that input data)
# The dataset has 3 columns <Class (+/-)> <Instance Name> <Sequence>
df = pd.read_csv('data/promoter_sequences/promoters.data', header=None, names=['Class', 'Name', 'Sequence'])

# Clean up whitespace or tabs in the sequence column
df['Sequence'] = df['Sequence'].str.strip().str.replace('\t', '')

#Convert the promoter (+) and non-promoter (-) labels to: 1s and 0s
y = df['Class'].apply(lambda x: 1 if '+' in x else 0)
X_raw = df['Sequence']

# 2. Convert DNA to Math (k-mer Counting)
k = 6 # Extracting 6-mers (sequences of 6 nucleotides as the natural biological sequence)

# CountVectorizer usually looks at whole words, but setting analyzer='char' forces it to slide across the DNA string character by character.
vectorizer = CountVectorizer(analyzer='char', ngram_range=(k, k))
X_kmers = vectorizer.fit_transform(X_raw)

# 3. Train/Test Split
# 80% of training data, 20% for testing data
X_train, X_test, y_train, y_test = train_test_split(X_kmers, y, 
                                test_size=0.2, random_state=42)

# 4. Train the Random Forest Classifier -- hundreds of decision trees tweaking to find the best
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

# 5. Evaluate the Model
y_pred = rf_model.predict(X_test) #testing the 0.2
print(f"Model Accuracy: {accuracy_score(y_test, y_pred) * 100:.2f}%\n")
print("Classification Report:")
print(classification_report(y_test, y_pred, target_names=['Non-Promoter (-)', 'Promoter (+)']))

#Backend - Pickle saves the trained model and the vectorizer so your FastAPI can use them later
#saved as .pkl files. Later reloaded by using APIs to make prediction.
with open('models/dna_model.pkl', 'wb') as f:
    pickle.dump(rf_model, f)
with open('models/vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)
    
print("Model and Vectorizer saved successfully!")