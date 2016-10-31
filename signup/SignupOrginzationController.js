/*jslint node: true */
'use strict';

/** @ngInject */
function SignupOrginzationController(apiHttpServices, $state) {
    var self = this;

    var orginzation = {
        name: null,
        industry: null,
        type: null,
        email: null,
        password: null,
        confirmPassword: null
    };

    self.orginzation = orginzation;

    self.error = false;
    self.errorMessage = 'Incorrect password or username code entered. Please try again.';
    self.errorTitle = 'Login error';

    apiHttpServices.set('RegisterOrganization');

    self.registerOrganization = function() {

        if (self.orginzation) {

            var login_object = {
                'Email': self.orginzation.email,
                'Password': self.orginzation.password,
                'ConfirmPassword': self.orginzation.confirmPassword,
                'Name': self.orginzation.name,
                'Industry': self.orginzation.industry,
                'Type': self.orginzation.type
            };
            apiHttpServices.store(login_object).then(function(serverData) {
                    console.log(serverData);
                    $state.go('login');
                },
                function(error) {
                    self.error = true;
                    //showAlert();
                });

        } else {
            self.error = true;
            //showAlert();
        }

    };


    self.loginFacebook = function() {
        //facebookAuth.auth();
    };

    self.loginGoogle = function() {
        //googleAuth.auth();
    };

    function showAlert() {
        popupServices.show(self.errorTitle, self.errorMessage);
    }



}


module.exports = ['apiHttpServices', '$state', SignupOrginzationController];
