import axios from "axios";
import ResumePreview from "./ResumePreview";

const API_URL = "http://localhost:8000";

function Editor({ resume, setResume }) {
  const handleInputChange = (section, key, value) => {
    setResume((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const handleSectionChange = (section, value) => {
    setResume((prev) => ({ ...prev, [section]: value }));
  };

  const handleListChange = (section, index, key, value) => {
    const newList = [...resume[section]];
    newList[index][key] = value;
    setResume((prev) => ({ ...prev, [section]: newList }));
  };

  const addListItem = (section) => {
    const newItem =
      section === "experience"
        ? {
            id: `exp${Date.now()}`,
            title: "",
            company: "",
            dates: "",
            description: "",
          }
        : section === "education"
        ? { id: `edu${Date.now()}`, institution: "", degree: "", dates: "" }
        : "";

    if (section === "skills") {
      setResume((prev) => ({ ...prev, [section]: [...prev[section], ""] }));
    } else {
      setResume((prev) => ({
        ...prev,
        [section]: [...prev[section], newItem],
      }));
    }
  };

  const removeListItem = (section, index) => {
    setResume((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...resume.skills];
    newSkills[index] = value;
    setResume((prev) => ({ ...prev, skills: newSkills }));
  };

  const handleEnhance = async (section, content, index = null) => {
    if (!content || content.trim() === "") {
      alert(`Cannot enhance an empty ${section}. Please add text first.`);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/ai-enhance`, { content });

      if (!response.data || !response.data.enhanced_content) {
        throw new Error("Invalid response from server");
      }

      if (section === "experience" && index !== null) {
        handleListChange(
          "experience",
          index,
          "description",
          response.data.enhanced_content
        );
      } else {
        handleSectionChange(section, response.data.enhanced_content);
      }
    } catch (error) {
      console.error("Enhance error:", error);
      alert(`Failed to enhance ${section}. Check the server logs or API URL.`);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(`${API_URL}/save-resume`, resume);
      alert("Resume saved successfully!");
    } catch (error) {
      alert("Failed to save resume.");
    }
  };

  const handleDownload = () => {
    const jsonString = JSON.stringify(resume, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };

  if (!resume) return <div>Loading editor...</div>;

  return (
    <>
      <div className="editor-layout">
        <div className="edit-panel">
          {/* Personal Info Card */}
          <div className="card">
            <div className="card-header">
              <h3>Personal Information</h3>
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={resume.personal_info.name}
                onChange={(e) =>
                  handleInputChange("personal_info", "name", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={resume.personal_info.email}
                onChange={(e) =>
                  handleInputChange("personal_info", "email", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={resume.personal_info.phone}
                onChange={(e) =>
                  handleInputChange("personal_info", "phone", e.target.value)
                }
              />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Professional Summary</h3>
              <button
                className="btn-ai"
                onClick={() => handleEnhance("summary", resume.summary)}
              >
                ✨ Enhance with AI
              </button>
            </div>
            <textarea
              value={resume.summary}
              onChange={(e) => handleSectionChange("summary", e.target.value)}
              rows="4"
            />
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Work Experience</h3>
              <button
                className="btn-add"
                onClick={() => addListItem("experience")}
              >
                + Add Experience
              </button>
            </div>
            {resume.experience.map((exp, index) => (
              <div key={exp.id} className="entry">
                <div className="entry-header">
                  <h4>Experience {index + 1}</h4>
                  <button
                    className="btn-ai"
                    onClick={() =>
                      handleEnhance("experience", exp.description, index)
                    }
                  >
                    ✨ Enhance
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => removeListItem("experience", index)}
                  >
                    Remove
                  </button>
                </div>
                <div className="form-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) =>
                      handleListChange(
                        "experience",
                        index,
                        "title",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      handleListChange(
                        "experience",
                        index,
                        "company",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Dates</label>
                  <input
                    type="text"
                    value={exp.dates}
                    onChange={(e) =>
                      handleListChange(
                        "experience",
                        index,
                        "dates",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      handleListChange(
                        "experience",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows="3"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Education</h3>
              <button
                className="btn-add"
                onClick={() => addListItem("education")}
              >
                + Add Education
              </button>
            </div>
            {resume.education.map((edu, index) => (
              <div key={edu.id} className="entry">
                <div className="entry-header">
                  <h4>Education {index + 1}</h4>
                  <button
                    className="btn-danger"
                    onClick={() => removeListItem("education", index)}
                  >
                    Remove
                  </button>
                </div>
                <div className="form-group">
                  <label>Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      handleListChange(
                        "education",
                        index,
                        "institution",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      handleListChange(
                        "education",
                        index,
                        "degree",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Dates</label>
                  <input
                    type="text"
                    value={edu.dates}
                    onChange={(e) =>
                      handleListChange(
                        "education",
                        index,
                        "dates",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Skills</h3>
              <button className="btn-add" onClick={() => addListItem("skills")}>
                + Add Skill
              </button>
            </div>
            {resume.skills.map((skill, index) => (
              <div key={index} className="skill-entry">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  placeholder="Enter skill"
                />
                <button
                  className="btn-danger"
                  onClick={() => removeListItem("skills", index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="preview-panel">
          <ResumePreview resume={resume} />
        </div>
      </div>

      <div className="global-actions">
        <button className="btn-save" onClick={handleSave}>
          💾 Save to Server
        </button>
        <button className="btn-download" onClick={handleDownload}>
          📥 Download JSON
        </button>
      </div>
    </>
  );
}

export default Editor;
