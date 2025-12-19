import AuthInput from "@/components/common/authUi/AuthInput"

function ForgotPasswordInput({ field, value, onChange, error, styles }) {
  return (
     <AuthInput
      {...field}
      value={value}
      onChange={onChange}
      error={error}
      styles={styles}
    />
  )
}

export default ForgotPasswordInput