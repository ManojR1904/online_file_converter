import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const FileConverter = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("");
  const [convertedFile, setConvertedFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*,application/pdf",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setConvertedFile(null);
      setError("");
    },
  });

  const handleConvert = async () => {
    if (!file || !format) {
      setError("⚠️ Please select a file and target format.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);

    try {
      const response = await axios.post("http://127.0.0.1:5000/convert", formData, {
        responseType: "blob", // To handle file download
      });

      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const downloadUrl = window.URL.createObjectURL(blob);
      setConvertedFile(downloadUrl);
    } catch (err) {
      setError("❌ Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="bg-gray-700 text-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-400 mb-4">File Converter</h2>

        {/* File Upload */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-6 rounded-xl text-center transition ${
            isDragActive ? "border-blue-500 bg-gray-600" : "border-gray-500 bg-gray-800"
          } cursor-pointer`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-gray-300">📄 {file.name}</p>
          ) : (
            <p className="text-gray-400">Drag & drop a file here, or click to select</p>
          )}
        </div>

        {/* Format Selection */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-300">Convert to:</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-lg"
          >
            <option value="">Select format</option>
            <option value="docx">📄 PDF to DOCX</option>
            <option value="png">🖼️ JPG to PNG</option>
            <option value="jpg">🖼️ PNG to JPG</option>
          </select>
        </div>

        {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={loading}
          className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
        >
          {loading ? "⏳ Converting..." : "⚡ Convert File"}
        </button>

        {/* Download Converted File */}
        {convertedFile && (
          <div className="mt-4 text-center">
            <a
              href={convertedFile}
              download="converted-file"
              className="text-blue-300 hover:text-blue-500 underline"
            >
              📥 Download Converted File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileConverter;
