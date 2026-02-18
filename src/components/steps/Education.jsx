import FormWrapper from "../FormWrapper";

const DEGREE_OPTIONS = [
  { value: "", label: "Select degree" },
  { value: "high-school", label: "High School Diploma" },
  { value: "associate", label: "Associate's Degree" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "phd", label: "Ph.D." },
  { value: "other", label: "Other" },
];

export default function Education({ formData, errors, updateField, direction }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <FormWrapper
      title="Education"
      description="Share your educational background"
      direction={direction}
    >
      <div className="form-grid">
        <div className="form-group full-width">
          <label htmlFor="degree">Degree *</label>
          <select
            id="degree"
            value={formData.degree}
            onChange={(e) => updateField("degree", e.target.value)}
            className={errors.degree ? "error" : ""}
            autoFocus
          >
            {DEGREE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.degree && (
            <span className="error-text">{errors.degree}</span>
          )}
        </div>

        <div className="form-group full-width">
          <label htmlFor="university">University / Institution *</label>
          <input
            id="university"
            type="text"
            placeholder="MIT, Stanford, etc."
            value={formData.university}
            onChange={(e) => updateField("university", e.target.value)}
            className={errors.university ? "error" : ""}
          />
          {errors.university && (
            <span className="error-text">{errors.university}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="graduationYear">Graduation Year *</label>
          <select
            id="graduationYear"
            value={formData.graduationYear}
            onChange={(e) => updateField("graduationYear", e.target.value)}
            className={errors.graduationYear ? "error" : ""}
          >
            <option value="">Select year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.graduationYear && (
            <span className="error-text">{errors.graduationYear}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="gpa">GPA <span className="label-hint">(optional)</span></label>
          <input
            id="gpa"
            type="text"
            placeholder="3.8 / 4.0"
            value={formData.gpa}
            onChange={(e) => updateField("gpa", e.target.value)}
          />
        </div>
      </div>
    </FormWrapper>
  );
}
