import FormWrapper from "../FormWrapper";

export default function PersonalInfo({ formData, errors, updateField, direction }) {
  return (
    <FormWrapper
      title="Personal Information"
      description="Let's start with your basic details"
      direction={direction}
    >
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className={errors.firstName ? "error" : ""}
            autoFocus
          />
          {errors.firstName && (
            <span className="error-text">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            className={errors.lastName ? "error" : ""}
          />
          {errors.lastName && (
            <span className="error-text">{errors.lastName}</span>
          )}
        </div>

        <div className="form-group full-width">
          <label htmlFor="email">Email Address *</label>
          <input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-text">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && (
            <span className="error-text">{errors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            value={formData.dob}
            onChange={(e) => updateField("dob", e.target.value)}
          />
        </div>
      </div>
    </FormWrapper>
  );
}
