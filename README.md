E-commerce functionality for subscriptions and other potential products
from flask import Flask, render_template, request, session, redirect, url_for
import speech_recognition as sr
import pyttsx3
import stripe

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'

# Stripe API configuration
stripe.api_key = 'your_stripe_secret_key'

# Define the experts and their areas of expertise
experts = [
    {"name": "Dr. Alice Smith", "expertise": "AI Ethics"},
    {"name": "Dr. Bob Johnson", "expertise": "Machine Learning"},
    # ... (other experts)
]

# Voice engine setup
engine = pyttsx3.init()

# Homepage
@app.route('/')
def index():
    return render_template('index.html', experts=experts)

# Individual expert pages
@app.route('/expert/<name>')
def expert_page(name):
    expert = next((exp for exp in experts if exp["name"] == name), None)
    if expert:
        return render_template('expert.html', expert=expert)
    return "Expert not found", 404

# ChatterGPTXperts AI Agent Interaction Page
@app.route('/chatter')
def chatter():
    return render_template('chatter.html', history=session.get('history', []))

# Handle interaction with the AI Agent
@app.route('/ask', methods=['POST'])
def ask():
    user_input = request.form['question']
    
    # Process voice input if available
    if 'voice_input' in request.files:
        recognizer = sr.Recognizer()
        audio_file = request.files['voice_input']
        audio = sr.AudioFile(audio_file)
        with audio as source:
            recognizer.adjust_for_ambient_noise(source)
            audio_data = recognizer.record(source)
        user_input = recognizer.recognize_google(audio_data)

    # Mock response from the AI Agent
    response = f"The AI Agent responds to your question: {user_input}"
    
    # Update conversation history
    history = session.get('history', [])
    history.append({"user": user_input, "agent": response})
    session['history'] = history
    
    # Provide voice output
    engine.say(response)
    engine.runAndWait()
    
    return render_template('chatter.html', response=response, history=history)

# E-commerce: Subscribe to an Expert
@app.route('/subscribe', methods=['POST'])
def subscribe():
    stripe.PaymentIntent.create(
        amount=1000,  # Amount in cents
        currency='usd',
        payment_method_types=['card'],
        receipt_email=request.form['email']
    )
    return "Subscription Successful!", 200

# E-commerce: Purchase Upgrade
@app.route('/upgrade', methods=['POST'])
def upgrade():
    stripe.PaymentIntent.create(
        amount=5000,  # Amount in cents
        currency='usd',
        payment_method_types=['card'],
        receipt_email=request.form['email']
    )
    return "Upgrade Purchased Successfully!", 200

# Share/Collaborate on Generated Content
@app.route('/share', methods=['POST'])
def share():
    content = request.form['content']
    # Logic to share content via email or collaboration platform
    return "Content Shared Successfully!", 200

if __name__ == '__main__':
    app.run(debug=True)

Step 3: Create HTML Templates
1. index.html

This is the homepage where users can see the list of experts.

html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HLB Technology Experts</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1 class="mt-5">Welcome to HLB Technology Experts</h1>
        <p>Select an expert to learn more:</p>
        <ul>
            {% for expert in experts %}
            <li><a href="{{ url_for('expert_page', name=expert.name) }}">{{ expert.name }}</a> - {{ expert.expertise }}</li>
            {% endfor %}
        </ul>
        <a href="{{ url_for('chatter') }}" class="btn btn-primary mt-3">Interact with ChatterGPTXperts AI Agent</a>
    </div>
</body>
</html>

2. expert.html

This is the page for each individual expert.

html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ expert.name }}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>{{ expert.name }}</h1>
        <p>Area of Expertise: {{ expert.expertise }}</p>
        <a href="/" class="btn btn-secondary mt-3">Back to Experts List</a>
    </div>
</body>
</html>

3. chatter.html

This is the page where users can interact with the ChatterGPTXperts AI Agent, manage conversation history, and utilize voice input.

html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatterGPTXperts AI Agent</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Interact with ChatterGPTXperts AI Agent</h1>
        <form method="POST" action="/ask" enctype="multipart/form-data">
            <label for="question">Ask the AI Agent a question:</label><br>
            <input type="text" id="question" name="question" class="form-control" required><br>
            <label for="voice_input">Or upload a voice question:</label><br>
            <input type="file" id="voice_input" name="voice_input" class="form-control"><br><br>
            <input type="submit" value="Ask" class="btn btn-primary">
        </form>
        {% if response %}
        <p><strong>Response:</strong> {{ response }}</p>
        {% endif %}
        <h3>Conversation History</h3>
        <ul>
            {% for entry in history %}
            <li><strong>You:</strong> {{ entry.user }}<br><strong>AI Agent:</strong> {{ entry.agent }}</li>
            {% endfor %}
        </ul>
        <a href="/" class="btn btn-secondary mt-3">Back to Experts List</a>
    </div>
</body>
</html>

Step 4: Run the Application

Execute the Flask application by running the following command:

python app.py

Access the application in your web browser by navigating to http://127.0.0.1:5000/.
