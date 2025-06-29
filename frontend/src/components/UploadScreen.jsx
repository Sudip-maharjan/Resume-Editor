function UploadScreen({ onUpload }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`File "${file.name}" selected. Click "Load Editor" to proceed.`);
    }
  };

  return (
    <div className="upload-container">
      <h1>Resume Editor</h1>
      <p>Upload your existing resume but start with our template.</p>
      <div className="upload-box">
        <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
        <p>Mock Upload (pre-filled data will be loaded)</p>
      </div>
      <button className="load-button" onClick={onUpload}>
        Load Editor
      </button>
    </div>
  );
}

export default UploadScreen;
