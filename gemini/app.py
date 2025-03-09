from flask import Flask, request, jsonify
from google import genai
from dotenv import load_dotenv
from flask_cors import CORS
import os
import base64

load_dotenv()

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

with open('prompt.txt', 'r') as file:
    prompt_template = file.read()

@app.route('/save-image', methods=['POST'])
def save_image():
    data = request.get_json()
    image_data = data['imageData']
    image_data = image_data.split(',')[1]
    image_data = base64.b64decode(image_data)
    image_path = os.path.join('shared', 'image.png')
    os.makedirs(os.path.dirname(image_path), exist_ok=True)
    with open(image_path, 'wb') as f:
        f.write(image_data)
    return jsonify({'imagePath': image_path})

@app.route('/process-image', methods=['POST'])
def process_image():
    data = request.get_json()
    image_path = data['imagePath']
    file_ref = client.files.upload(file=image_path)
    response = client.models.generate_content(
        model="gemini-2.0-flash-exp",
        contents=[prompt_template, file_ref]
    )
    return jsonify({'text': response.text})

if __name__ == '__main__':
    app.run(debug=True)