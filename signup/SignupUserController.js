/*jslint node: true */
'use strict';

/** @ngInject */
function SignupUserController(apiHttpServices, $state) {
    var self = this;


    var user = {
        fisrtName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null
    };

    self.user = user;

    self.error = false;
    self.errorMessage = 'Incorrect password or username code entered. Please try again.';
    self.errorTitle = 'Login error';


    apiHttpServices.set('RegisterUser');

    self.registerUser = function() {

        if (self.user) {

            var login_object = {
                'Email': self.user.email,
                'LastName': self.user.lastName,
                'FirstName': self.user.fisrtName,
                'Password': self.user.password,
                'ConfirmPassword': self.user.confirmPassword
            };
            console.log(login_object);
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
        facebookAuth.auth();
    };

    self.loginGoogle = function() {
        //googleAuth.auth();
    };

    function showAlert() {
        popupServices.show(self.errorTitle, self.errorMessage);
    }

}


module.exports = ['apiHttpServices', '$state', SignupUserController];
