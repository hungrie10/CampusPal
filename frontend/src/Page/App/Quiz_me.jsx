import React, { useState } from "react";
import Footer from "../../component/Footer";

function Quiz_me() {
  const [quiz, setQuiz] = useState(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 📁 handle file selection
  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setError("");
  };

  // 🖱️ drag handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  // 📤 upload + generate quiz (backend ready)
const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      // 1. Get the token from localStorage
      const token = localStorage.getItem("token");

      // 2. Add the Authorization header
      const res = await fetch("http://localhost:3500/upload", {
        method: "POST",
        headers: {
          // This tells the backend WHO is making the request
          "Authorization": `Bearer ${token}` 
        },
        body: formData, // Note: Don't set Content-Type header manually for FormData
      });

      const data = await res.json();

      if (!res.ok) {
        // If status is 401, they aren't logged in
        if (res.status === 401) {
          setError("Please login to generate a quiz.");
        } else {
          setError(data.message || "Upload failed");
        }
        return;
      }

      setQuiz(data.quiz);
      alert("Quiz generated successfully!");
      
    } catch (err) {
      console.error("Upload error:", err);
      setError("Cannot connect to server. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="quiz_me_page">
      <section id="upload_my_work">
        <div id="upload_instructions">
          <h2>Upload My Work</h2>
          <p>Drag and Drop your Course Work Here for A Quiz Me!</p>
        </div>

        {/* 📦 UPLOAD BOX */}
        <div id="upload_box">
          <div
            id="upload_panel"
            className={dragActive ? "drag-active" : ""}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input
              type="file"
              id="fileInput"
              hidden
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {file ? (
              <p>📄 {file.name}</p>
            ) : (
              <p>Click or Drag & Drop File Here</p>
            )}
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button id="upload_button" onClick={handleUpload} disabled={loading}>
            {loading ? "Generating Quiz..." : "Generate My Quiz"}
          </button>
        </div>
      </section>

      <section id="see_prev_quizesz">
        <p>See Previous Quizzes</p>
      </section>

      <Footer />
    </main>
  );
}

export default Quiz_me;