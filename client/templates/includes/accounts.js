Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'full_name',
        fieldLabel: 'Username',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Por favor entre um username");
            return false;
          } else {
            return true;
          }
        }
    }],
    forceEmailLowercase: true,
    forceUsernameLowercase: true,
    forcePasswordLowercase: true,
});
