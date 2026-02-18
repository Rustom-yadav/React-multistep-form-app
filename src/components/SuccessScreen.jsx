export default function SuccessScreen({ onReset }) {
  return (
    <div className="success-screen">
      <div className="success-animation">
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip" />
            <span className="icon-line line-long" />
            <div className="icon-circle" />
            <div className="icon-fix" />
          </div>
        </div>
      </div>
      <h2 className="success-title">Submission Successful!</h2>
      <p className="success-message">
        Your application has been submitted successfully. We&apos;ll review your
        information and get back to you shortly.
      </p>
      <button type="button" className="btn btn-primary" onClick={onReset}>
        Submit Another Response
      </button>
    </div>
  );
}
