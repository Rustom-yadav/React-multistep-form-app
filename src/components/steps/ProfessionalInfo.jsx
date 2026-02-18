import FormWrapper from "../FormWrapper";

const SKILL_OPTIONS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "Go",
  "Rust",
  "SQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Git",
];

const EXPERIENCE_OPTIONS = [
  { value: "", label: "Select experience" },
  { value: "0-1", label: "0 - 1 years" },
  { value: "1-3", label: "1 - 3 years" },
  { value: "3-5", label: "3 - 5 years" },
  { value: "5-10", label: "5 - 10 years" },
  { value: "10+", label: "10+ years" },
];

export default function ProfessionalInfo({ formData, errors, updateField, direction }) {
  const toggleSkill = (skill) => {
    const current = formData.skills;
    const updated = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    updateField("skills", updated);
  };

  return (
    <FormWrapper
      title="Professional Information"
      description="Tell us about your work experience"
      direction={direction}
    >
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="company">Company *</label>
          <input
            id="company"
            type="text"
            placeholder="Google, Microsoft, etc."
            value={formData.company}
            onChange={(e) => updateField("company", e.target.value)}
            className={errors.company ? "error" : ""}
            autoFocus
          />
          {errors.company && (
            <span className="error-text">{errors.company}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role">Job Role *</label>
          <input
            id="role"
            type="text"
            placeholder="Frontend Developer"
            value={formData.role}
            onChange={(e) => updateField("role", e.target.value)}
            className={errors.role ? "error" : ""}
          />
          {errors.role && (
            <span className="error-text">{errors.role}</span>
          )}
        </div>

        <div className="form-group full-width">
          <label htmlFor="experience">Years of Experience *</label>
          <select
            id="experience"
            value={formData.experience}
            onChange={(e) => updateField("experience", e.target.value)}
            className={errors.experience ? "error" : ""}
          >
            {EXPERIENCE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.experience && (
            <span className="error-text">{errors.experience}</span>
          )}
        </div>

        <div className="form-group full-width">
          <label>Skills * <span className="label-hint">(select all that apply)</span></label>
          <div className="skills-grid">
            {SKILL_OPTIONS.map((skill) => (
              <button
                key={skill}
                type="button"
                className={`skill-chip ${
                  formData.skills.includes(skill) ? "selected" : ""
                }`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
          {errors.skills && (
            <span className="error-text">{errors.skills}</span>
          )}
        </div>
      </div>
    </FormWrapper>
  );
}
