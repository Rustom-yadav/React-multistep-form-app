export default function FormWrapper({ title, description, direction, children }) {
  return (
    <div className={`form-step slide-${direction}`} key={title}>
      <div className="form-step-header">
        <h2 className="form-step-title">{title}</h2>
        {description && <p className="form-step-description">{description}</p>}
      </div>
      <div className="form-step-content">{children}</div>
    </div>
  );
}
