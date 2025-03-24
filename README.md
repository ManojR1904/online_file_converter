# Online File Converter

## 📌 Introduction
The **Online File Converter** is a web-based tool that allows users to convert files between different formats. It supports:
- **PDF to DOCX** (Convert PDF files to Word documents)
- **JPG to PNG** and **PNG to JPG** (Convert images between JPG and PNG formats)

The project consists of a **React.js frontend** and a **Flask backend**.

---

## 📁 Project Structure
```
online_file_converter/
│── backend/
│   ├── app.py  # Flask backend
│   ├── uploads/  # Directory for uploaded files
│   ├── converted/  # Directory for converted files
│   ├── requirements.txt  # Backend dependencies
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileConverter.js  # Main UI component
│   │   ├── App.js  # Main React app
│   │   ├── index.js  # Entry point for React
│   ├── public/
│   ├── package.json  # Frontend dependencies
│── README.md  # Project documentation
```

---

## 🚀 Installation and Setup

### 1️⃣ Backend (Flask API)

#### **Step 1: Install Python and Virtual Environment**
Ensure you have **Python 3** installed. Then, navigate to the `backend/` folder:
```sh
cd backend
python -m venv venv  # Create a virtual environment
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate  # Windows
```

#### **Step 2: Install Dependencies**
```sh
pip install -r requirements.txt
```

#### **Step 3: Run the Backend**
```sh
python app.py
```
The server will start on `http://127.0.0.1:5000`

---

### 2️⃣ Frontend (React.js)

#### **Step 1: Install Node.js**
Ensure you have **Node.js** installed. Then, navigate to the `frontend/` folder:
```sh
cd frontend
```

#### **Step 2: Install Dependencies**
```sh
npm install
```

#### **Step 3: Install Tailwind CSS**
```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### **Step 4: Start the Frontend**
```sh
npm start
```
The frontend will run on `http://localhost:3000`

---

## 🔄 How to Use
1. **Upload a file** using the file selection input.
2. **Choose a conversion format** (PDF to DOCX, JPG to PNG, PNG to JPG).
3. **Click the "Convert" button**.
4. The file will be processed, and the **converted file will be downloaded automatically**.

---

## 🔧 Troubleshooting

### ❌ *Error: "ModuleNotFoundError: No module named 'flask'"*
Solution:
```sh
pip install flask flask-cors pdf2docx pillow
```

### ❌ *Error: "Failed to Fetch" in Frontend*
Solution:
- Ensure the backend is **running on port 5000** (`http://127.0.0.1:5000`)
- Check if CORS is enabled in `app.py`:
  ```python
  from flask_cors import CORS
  CORS(app)
  ```

### ❌ *Error: "tailwind not recognized" in Frontend*
Solution:
```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---
