/*jslint node: true */
'use strict';

/** @ngInject */
function googleAuth(apiHttpServices, $cordovaOauth, $localStorage, popupServices) {
    var scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.circles.read',
        'https://www.googleapis.com/auth/plus.profiles.read',
        'https://www.googleapis.com/auth/plus.circles.write',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.google.com/m8/feeds/contacts/default/full'
    ];


    var options = {
        "immediate": false
    };

    var CLIENT_ID = "555919990899-9s5ggcoi2i0pkkqj672d757eo4bjgkei.apps.googleusercontent.com";
    return {
        auth: function() {
            $cordovaOauth.google(CLIENT_ID, scopes, options).then(function(response) {
                console.log("First Auth with google " + response);
                var work = "",
                    company = "",
                    education = "",
                    address = "";
                if (response.organizations && response.organizations.length > 0) {
                    for (var i = 0; i < response.organizations.length; i++) {
                        if (response.organizations[i].type == 'school') {
                            education = response.organizations[i].name;
                        } else if (response.organizations[i].type == 'work') {
                            company = response.organizations[i].name;
                        }
                    }
                }
                if (response.placesLived && response.placesLived.length > 0) {
                    address = response.placesLived[0].value;
                }
                if (response.emails[0].value) {
                    var data = {
                        "googleId": response.id,
                        "firstName": response.name.givenName,
                        "lastName": response.name.familyName,
                        "email": response.emails[0].value,
                        "picture": response.image.url,
                        "gender": response.gender,
                        "name": response.name.givenName + " " + response.name.familyName,
                        "education": education,
                        "company": company,
                        "address": address,
                        "googleProfileUrl": response.url,
                    };

                    apiHttpServices.set('LoginOrSignUpGoogle');
                    apiHttpServices.post(data).success(function(data) {
                        console.log("First auth with info : " + data);
                        if (data == "organization") {
                            popupServices.show('danger', "This email '" + response.emails[0].value + "' belongs to organization account please.Log in using email and password.");
                            //unblockBody("body");
                        } else if (data == 'user') {
                            popupServices.show('danger', "This email '" + response.emails[0].value + "' belongs to another user account.");
                            //unblockBody("body");
                        } else {
                            //location.reload();
                        }

                    }, function(error) {

                    });
                } else {
                    popupServices.show('danger', 'According to your privacy level we can not get your data from Google plus .. Please go to Register page to have an account and join Google plus later on.');
                    // setTimeout(location.href = "/Account/Register", 5000);
                    // unblockBody("body");
                }

                $localStorage.accessToken = response.access_token;
                console.log(response);
            }, function(error) {

            });
        }
    };



}

module.exports = ['apiHttpServices', '$cordovaOauth', '$localStorage', 'popupServices', googleAuth];
