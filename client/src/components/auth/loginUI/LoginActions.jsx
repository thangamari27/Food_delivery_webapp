import AuthButton from "@/components/common/authUi/AuthButton";

function LoginActions({ 
  content, 
  rememberMe, 
  setRememberMe, 
  onNavigate, 
  handleSubmit, 
  loading, 
  styles 
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <label className={styles.form.checkbox}>          
          <span className={styles.form.rememberMeText}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className={styles.form.checkboxInput}
            />
            {content.rememberMe}
          </span>
          <button
            type="button"
            onClick={() => onNavigate('forgotPassword')}
            className={styles.link}
          >
            {content.forgotPassword}
          </button>
        </label>
      </div>
      
      <AuthButton onClick={handleSubmit} disabled={loading} styles={styles.button}>
        {loading ? 'Signing in...' : content.submitText}
      </AuthButton>
    </>
  );
}

export default LoginActions;