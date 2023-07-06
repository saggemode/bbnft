const TextInput = ({
  fieldName,
  register,
  errors,
  placeHolder,
  isRequired,
  maximLength,
  minimLength,
  isPattern
}) => {
  return (
    //Input field
    <div className="form-field">
      <input
        placeholder={placeHolder}
        className="mt-8 border rounded p-4"
        {...register(fieldName, {
          required: {
            value: isRequired,
            message: "This is required",
          },
          maxLength: {
            value: maximLength,
            message: `Value must be maximum ${maximLength}`,
          },
          minLength: {
            value: minimLength,
            message: `Value must be minimum ${minimLength}`,
          },
          pattern: {
            value: isPattern,
            message: "Please enter valid email",
          },
        })}
      />

      <p>{errors[fieldName] && errors[fieldName].message} </p>
    </div>
  );
};

export default TextInput;
