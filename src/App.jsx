import { useMultiStepForm } from "./hooks/useMultiStepForm";
import Stepper from "./components/Stepper";
import PersonalInfo from "./components/steps/PersonalInfo";
import ProfessionalInfo from "./components/steps/ProfessionalInfo";
import Education from "./components/steps/Education";
import Preferences from "./components/steps/Preferences";
import ReviewSubmit from "./components/steps/ReviewSubmit";
import SuccessScreen from "./components/SuccessScreen";
import "./App.css";

const TOTAL_STEPS = 5;

function App() {
  const {
    currentStep,
    formData,
    errors,
    isSubmitted,
    direction,
    isFirstStep,
    isLastStep,
    progress,
    updateField,
    nextStep,
    prevStep,
    goToStep,
    submitForm,
    resetForm,
  } = useMultiStepForm(TOTAL_STEPS);

  if (isSubmitted) {
    return (
      <div className="app-container">
        <div className="form-card">
          <SuccessScreen onReset={resetForm} />
        </div>
      </div>
    );
  }

  const stepProps = { formData, errors, updateField, direction };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfo {...stepProps} />;
      case 1:
        return <ProfessionalInfo {...stepProps} />;
      case 2:
        return <Education {...stepProps} />;
      case 3:
        return <Preferences {...stepProps} />;
      case 4:
        return <ReviewSubmit formData={formData} goToStep={goToStep} direction={direction} />;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLastStep) {
      submitForm();
    } else {
      nextStep();
    }
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">Multi-Step Application</h1>
          <p className="form-subtitle">Complete all steps to submit your application</p>
        </div>

        <Stepper currentStep={currentStep} goToStep={goToStep} />

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-body">{renderStep()}</div>

          <div className="form-actions">
            {!isFirstStep && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={prevStep}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className={`btn btn-primary ${isLastStep ? "btn-submit" : ""}`}
            >
              {isLastStep ? "Submit Application" : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
