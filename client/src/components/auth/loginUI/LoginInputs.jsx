import AuthInput from "@/components/common/authUi/AuthInput";

function LoginInputs({ fields, formData, errors, handleChange, styles, isSubmitting }) {
  return (
    <>
      {fields.map(field => (
        <AuthInput
          key={field.name}
          {...field}
          value={formData[field.name]}
          onChange={handleChange}
          error={errors[field.name]}
          styles={styles}
          disabled={isSubmitting}
        />
      ))}
    </>
  );
}

export default LoginInputs;