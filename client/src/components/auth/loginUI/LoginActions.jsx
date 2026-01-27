import AuthButton from "@/components/common/authUi/AuthButton";

function LoginActions({ 
  content, 
  rememberMe, 
  setRememberMe, 
  onNavigate, 
  handleSubmit, 
  loading, 
  styles,
  isSubmitting 
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <label className={styles.form.checkbox}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isSubmitting}
              className={styles.form.checkboxInput}
            />
            <span className={styles.form.rememberMeText}>
              {content.rememberMe}
            </span>
          </label>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('forgotPassword')}
          disabled={isSubmitting}
          className={`${styles.link} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {content.forgotPassword}
        </button>
      </div>
      
      <AuthButton 
        type="submit"
        onClick={handleSubmit} 
        disabled={loading} 
        isLoading={loading}
        styles={styles.button}
      >
        {loading ? 'Signing in...' : content.submitText}
      </AuthButton>
    </>
  );
}

export default LoginActions;