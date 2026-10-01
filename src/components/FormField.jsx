// Campo de formulario Bootstrap con estados is-valid / is-invalid
export default function FormField({
  id,
  name,
  label,
  type = 'text',
  value,
  checked,
  error,
  showValidation,
  onChange,
  onBlur,
  placeholder,
}) {
  const stateClass = showValidation ? (error ? 'is-invalid' : 'is-valid') : '';

  if (type === 'checkbox') {
    return (
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className={`form-check-input ${stateClass}`}
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
        />
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={`form-control ${stateClass}`}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
