from flask import Flask, request, send_file, jsonify
import os
import time  # ⏳ Import time for delay
from werkzeug.utils import secure_filename
from pdf2docx import Converter
from PIL import Image
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
CONVERTED_FOLDER = 'converted'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CONVERTED_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return "File Converter API is running"

@app.route('/convert', methods=['POST'])
def convert_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    target_format = request.form.get('format')
    
    if not file or not target_format:
        return jsonify({'error': 'Missing file or target format'}), 400
    
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    name, ext = os.path.splitext(filename)
    ext = ext.lower()  
    converted_filename = secure_filename(f"{name}.{target_format}")  
    converted_file_path = os.path.abspath(os.path.join(CONVERTED_FOLDER, converted_filename))  # Use absolute path

    try:
        if ext == '.pdf' and target_format == 'docx':
            cv = Converter(file_path)
            cv.convert(converted_file_path)
            cv.close()
        elif (ext == '.jpg' and target_format == 'png') or (ext == '.png' and target_format == 'jpg'):
            img = Image.open(file_path)
            img = img.convert("RGB")  
            img.save(converted_file_path)
            time.sleep(1)  # ⏳ Give OS time to register file
            print(f"🔍 DEBUG: Saved file at {converted_file_path}")

            if not os.path.exists(converted_file_path):
                print(f"❌ ERROR: File not found AFTER saving - {converted_file_path}")
                time.sleep(2)  # ⏳ Extra wait time just in case
                if not os.path.exists(converted_file_path):  # Second check
                    return jsonify({'error': 'File conversion failed!'}), 500
        else:
            return jsonify({'error': 'Unsupported conversion'}), 400

        print(f"✅ Successfully converted: {converted_file_path}")
        time.sleep(1)  # ⏳ Ensure OS recognizes file before sending

        return send_file(converted_file_path, as_attachment=True)

    except Exception as e:
        print(f"❌ Conversion Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
