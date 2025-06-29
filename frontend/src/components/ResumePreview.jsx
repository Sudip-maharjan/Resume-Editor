function ResumePreview({ resume }) {
  if (!resume) return null;

  const { personal_info, summary, experience, education, skills } = resume;

  return (
    <div className="resume-preview">
      <div className="header">
        <h1>{personal_info.name}</h1>
        <p className="contact-info">
          {personal_info.email} | {personal_info.phone}
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Professional Summary</h2>
        <div className="content">
          <p>{summary}</p>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Work Experience</h2>
        <div className="content">
          {experience.map((job) => (
            <div key={job.id} className="job">
              <p className="job-title">
                <strong>{job.title}</strong>
                <span className="job-dates">{job.dates}</span>
              </p>
              <p className="job-company">{job.company}</p>
              <p className="job-description">{job.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Education</h2>
        <div className="content">
          {education.map((edu) => (
            <div key={edu.id} className="edu-item">
              <p className="job-title">
                <strong>{edu.institution}</strong>
                <span className="job-dates">{edu.dates}</span>
              </p>
              <p>{edu.degree}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Skills</h2>
        <div className="content">
          <ul className="skills-list">
            {skills.map((skill, index) => (
              <li key={index} className="skill-item">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
