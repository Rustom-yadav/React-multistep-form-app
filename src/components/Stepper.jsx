const steps = [
  { label: "Personal", icon: "👤" },
  { label: "Professional", icon: "💼" },
  { label: "Education", icon: "🎓" },
  { label: "Preferences", icon: "⚙️" },
  { label: "Review", icon: "✅" },
];

export default function Stepper({ currentStep, goToStep }) {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div key={step.label} className="stepper-item-wrapper">
          <button
            type="button"
            className={`stepper-item ${
              index === currentStep
                ? "active"
                : index < currentStep
                ? "completed"
                : ""
            }`}
            onClick={() => goToStep(index)}
            disabled={index > currentStep}
            aria-label={`Step ${index + 1}: ${step.label}`}
            aria-current={index === currentStep ? "step" : undefined}
          >
            <span className="stepper-icon">
              {index < currentStep ? "✓" : step.icon}
            </span>
            <span className="stepper-label">{step.label}</span>
          </button>
          {index < steps.length - 1 && (
            <div
              className={`stepper-line ${
                index < currentStep ? "completed" : ""
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
