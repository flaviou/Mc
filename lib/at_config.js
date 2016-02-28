AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: true,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
//    privacyUrl: 'privacy',
//    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Hooks
//    onLogoutHook: myLogoutFunc,
//    onSubmitHook: mySubmitFunc,
//    preSignUpHook: myPreSubmitFunc,
//    postSignUpHook: myPostSubmitFunc,

    // Texts
    texts: {
      button: {
          signUp: "Assine apenas com o seu e-mail!"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recupere a sua senha"
      },
    },
});

T9n.setLanguage("pt");
