/*jslint node: true */
'use strict';

/** @ngInject */
function LoginController(apiHttpServices, $localStorage, $state, $facebookAuth) {

    if ($localStorage.accessToken && $localStorage.accessToken !== '')
        $state.go('menu.profile');

    var self = this;

    self.error = false;
    self.errorMessage = 'Please try again. Email or password Incorrect';
    self.errorTitle = 'Login error';

    self.email;
    self.password;
    self.rememberMe = true;


    self.login = function () {
        if (self.email && self.password) {

            var login_object = {
                'Email': self.email,
                'Password': self.password,
                'RememberMe': self.rememberMe
            };
            apiHttpServices.set('Login');


            apiHttpServices.store(login_object)
                .then(function (serverData) {

                    console.log(serverData.data.User);

                    if (serverData.headers().authorization) {
                        $localStorage.accessToken = serverData.headers().authorization;
                        $localStorage.user = serverData.data.User;
                        self.error = false;
                        $state.go('menu.profile');
                    } else {
                        self.error = true;
                        // showAlert();
                    }
                },
                function (error) {
                    self.error = true;
                    // showAlert();
                });

        } else {
            self.error = true;
            // showAlert();
        }

    };

    self.LoginOrSignUpFacebook = function () {
        //facebookAuth.auth();
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1385164571715512',
                xfbml: true,
                version: 'v2.1'
     
            });
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    console.log('Logged in.');

                    FB.api('/me', function (res) {
                        console.log(res.id);
                        console.log(res);
                        
                        var log = this;
                        if (res.email) {
                           

                            //   var fblocation, fbCompany, fbWork;

                            //     fblocation = (res.location) ? res.location.name : null;

                            //     if (res.work && inresfo.work.length > 0) {
                            //         if (res.work[0].employer && res.work[0].employer.name) {
                            //             fbCompany = res.work[0].employer.name;
                            //         }
                            //         if (res.work[0].position && res.work[0].position.name) {
                            //             fbWork = res.work[0].position.name;
                            //         }
                            //     }

                            var facebook_object = {
                                    
                                'FacebookId': res.id,
                                'FirstName': res.first_name,
                                'LastName': res.last_name,
                                'Name': res.first_name + " " + res.last_name,
                                'Email': res.email,
                                'Birthday': (res.birthday) ? res.birthday : "",
                                'Gender': res.gender,
                                'Username': res.first_name + res.last_name,
                                'Picture': "https://graph.facebook.com/" + res.id + "/picture",
                                'Work': (res.work) ? res.work : "",
                                'Education': (res.education) ? res.education : "",
                                'Address': (res.address) ? res.address : "",
                                'FacebookProfileUrl': "https://www.facebook.com/" + res.id,
                                'AccountType': "facebook",
                                'Phone': (res.phone) ? res.phone : "",
                                
                            };
                            //console.log(register_object);
                            apiHttpServices.set('LoginOrSignUpFacebook');
                            apiHttpServices.store(facebook_object).then(function (fbserverData) {
                                console.log(fbserverData);
                                if (fbserverData.headers().authorization) {
                                    $localStorage.accessToken = fbserverData.headers().authorization;
                                    $localStorage.fbuser = fbserverData.data.User;
                                    self.error = false;
                                    $state.go('menu.profile');
                                } else {
                                    self.error = true;
                                    //showAlert();
                                }
                            },
                                function (error) {
                                    self.error = true;
                                    //showAlert();
                                });
                            $state.go('menu.profile');

                        } else {
                           
          
                        }

                        //   apiHttpServices.set(loginFacebook);
                        //  $state.go('menu.profile');
        
     
   
                    });
    
                }
                else {
                    FB.login();
                }
            });
            //FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        } (document, 'script', 'facebook-jssdk'));
    };


    self.loginGoogle = function () {

    };

    function showAlert() {
        popupServices.show(self.errorTitle, self.errorMessage);
    }



}

module.exports = ['apiHttpServices', '$localStorage', '$state', LoginController];
