import FormWrapper from "../FormWrapper";

const DEGREE_MAP = {
  "high-school": "High School Diploma",
  associate: "Associate's Degree",
  bachelor: "Bachelor's Degree",
  master: "Master's Degree",
  phd: "Ph.D.",
  other: "Other",
};

function ReviewSection({ title, goToStep, stepIndex, children }) {
  return (
    <div className="review-section">
      <div className="review-section-header">
        <h3>{title}</h3>
        <button
          type="button"
          className="edit-btn"
          onClick={() => goToStep(stepIndex)}
        >
          Edit
        </button>
      </div>
      <div className="review-fields">{children}</div>
    </div>
  );
}

function ReviewField({ label, value }) {
  return (
    <div className="review-field">
      <span className="review-label">{label}</span>
      <span className="review-value">{value || "—"}</span>
    </div>
  );
}

export default function ReviewSubmit({ formData, goToStep, direction }) {
  return (
    <FormWrapper
      title="Review & Submit"
      description="Double-check your information before submitting"
      direction={direction}
    >
      <div className="review-container">
        <ReviewSection title="Personal Information" goToStep={goToStep} stepIndex={0}>
          <ReviewField
            label="Full Name"
            value={`${formData.firstName} ${formData.lastName}`}
          />
          <ReviewField label="Email" value={formData.email} />
          <ReviewField label="Phone" value={formData.phone} />
          <ReviewField label="Date of Birth" value={formData.dob} />
        </ReviewSection>

        <ReviewSection title="Professional Information" goToStep={goToStep} stepIndex={1}>
          <ReviewField label="Company" value={formData.company} />
          <ReviewField label="Role" value={formData.role} />
          <ReviewField label="Experience" value={formData.experience ? `${formData.experience} years` : ""} />
          <ReviewField
            label="Skills"
            value={formData.skills.length > 0 ? formData.skills.join(", ") : ""}
          />
        </ReviewSection>

        <ReviewSection title="Education" goToStep={goToStep} stepIndex={2}>
          <ReviewField label="Degree" value={DEGREE_MAP[formData.degree] || formData.degree} />
          <ReviewField label="University" value={formData.university} />
          <ReviewField label="Graduation Year" value={formData.graduationYear} />
          <ReviewField label="GPA" value={formData.gpa} />
        </ReviewSection>

        <ReviewSection title="Preferences" goToStep={goToStep} stepIndex={3}>
          <ReviewField
            label="Theme"
            value={formData.theme.charAt(0).toUpperCase() + formData.theme.slice(1)}
          />
          <ReviewField
            label="Communication"
            value={formData.communication.charAt(0).toUpperCase() + formData.communication.slice(1)}
          />
          <ReviewField
            label="Newsletter"
            value={formData.newsletter ? "Subscribed" : "Not subscribed"}
          />
          <ReviewField label="Bio" value={formData.bio} />
        </ReviewSection>
      </div>
    </FormWrapper>
  );
}
