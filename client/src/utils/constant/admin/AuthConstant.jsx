
export const authContent = {
  login: {
    title: "Welcome back!",
    subtitle: "Please sign in to continue",
    submitText: "Login",
    footerText: "Don't have an account?",
    footerLink: "Sign up",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?"
  },
  signup: {
    title: "Create Account",
    subtitle: "Join us for delicious food delivery",
    submitText: "Sign up",
    footerText: "Already have an account?",
    footerLink: "Sign in"
  },
  forgotPassword: {
    title: "Reset Password",
    subtitle: "Enter your email to receive reset instructions",
    submitText: "Send Reset Link",
    footerText: "Remember your password?",
    footerLink: "Sign in"
  }
};

export const authSocialProvider = [
  { 
    id: 'google', 
    src: {
      publicId: "google_orpyxx",
      format: "webp",
    },
    srcFallback: {
      publicId: "google_orpyxx",
      format: "jpg"
    },
    label: 'Continue with Google',
    alt: "Google" 
  },
];

export const inputFields = {
  login: [
    { name: 'email', type: 'email', placeholder: 'Email address', required: true },
    { name: 'password', type: 'password', placeholder: 'Password', required: true }
  ],
  signup: [
    { name: 'name', type: 'text', placeholder: 'Full name', required: true },
    { name: 'email', type: 'email', placeholder: 'Email address', required: true },
    { name: 'password', type: 'password', placeholder: 'Password', required: true },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm password', required: true }
  ],
  forgotPassword: [
    { name: 'email', type: 'email', placeholder: 'Email address', required: true }
  ]
};