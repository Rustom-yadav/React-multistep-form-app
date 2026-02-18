import FormWrapper from "../FormWrapper";

export default function Preferences({ formData, errors, updateField, direction }) {
  return (
    <FormWrapper
      title="Preferences"
      description="Customize your experience"
      direction={direction}
    >
      <div className="form-grid">
        <div className="form-group full-width">
          <label>Theme Preference</label>
          <div className="radio-group">
            {["light", "dark", "system"].map((option) => (
              <label key={option} className="radio-label">
                <input
                  type="radio"
                  name="theme"
                  value={option}
                  checked={formData.theme === option}
                  onChange={(e) => updateField("theme", e.target.value)}
                />
                <span className="radio-custom" />
                <span className="radio-text">
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group full-width">
          <label>Preferred Communication</label>
          <div className="radio-group">
            {["email", "phone", "sms"].map((option) => (
              <label key={option} className="radio-label">
                <input
                  type="radio"
                  name="communication"
                  value={option}
                  checked={formData.communication === option}
                  onChange={(e) => updateField("communication", e.target.value)}
                />
                <span className="radio-custom" />
                <span className="radio-text">
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group full-width">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.newsletter}
              onChange={(e) => updateField("newsletter", e.target.checked)}
            />
            <span className="checkbox-custom" />
            <span>Subscribe to newsletter for updates and tips</span>
          </label>
        </div>

        <div className="form-group full-width">
          <label htmlFor="bio">
            Short Bio * <span className="label-hint">(min 20 characters)</span>
          </label>
          <textarea
            id="bio"
            rows={4}
            placeholder="Tell us a bit about yourself..."
            value={formData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            className={errors.bio ? "error" : ""}
          />
          <div className="char-count">
            {formData.bio.length} / 20 min characters
          </div>
          {errors.bio && (
            <span className="error-text">{errors.bio}</span>
          )}
        </div>
      </div>
    </FormWrapper>
  );
}
