import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import UploadScreen from "./components/UploadScreen";
import Editor from "./components/Editor";

const API_URL = "http://localhost:8000";

function App() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [resume, setResume] = useState(null);

  const handleUpload = async () => {
    try {
      const response = await axios.get(`${API_URL}/resume`);
      setResume(response.data);
      setIsUploaded(true);
    } catch (error) {
      console.error("Error fetching initial resume data:", error);
      alert(
        "Could not load data from the server. Please ensure the backend is running."
      );
    }
  };

  return (
    <div className="App">
      {!isUploaded ? (
        <UploadScreen onUpload={handleUpload} />
      ) : (
        <Editor resume={resume} setResume={setResume} />
      )}
    </div>
  );
}

export default App;
