/*jslint node: true */
'use strict';

/** @ngInject */

function facebookAuth($cordovaOauth, $localStorage) {
    var CLIENT_ID = '1385164571715512';
    var scopes = ['email,user_birthday,user_location', 'user_work_history,publish_actions,user_friends'];
    return {
        auth: function() {
            $cordovaOauth.facebook(CLIENT_ID, scopes).then(function(loginresponse) {

                if (loginresponse.authResponse) {
                    $cordovaOauth.facebook(CLIENT_ID, ['/me'], function(info) {
                        if (info.email) {

                            var friends = [];

                            fBFriendLst(function(friendList) {

                                if (friendList !== null) {
                                    for (var i = 0; i < friendList.length; i++) {

                                        if (friendList[i].name && friendList[i].name.toLowerCase() == "private") {
                                            continue;
                                        }

                                        var f = {};
                                        f.Name = friendList[i].name;
                                        var names = friendList[i].name.split(' ');
                                        f.FirstName = names[0];
                                        if (names.length > 2) {
                                            f.MiddleName = names[1];
                                            f.LastName = names[names.length - 1];
                                        } else if (names.length == 2) {
                                            f.LastName = names[1];
                                        }
                                        f.Relationship = "friend";
                                        f.Id = friendList[i].id;
                                        f.FacebookProfileUrl = "https://www.facebook.com/" + friendList[i].id;
                                        f.Picture = "https://graph.facebook.com/" + friendList[i].id + "/picture?width=100&height=100";
                                        friends.push(f);
                                    }
                                }
                            });


                            var fblocation, fbCompany, fbWork;

                            fblocation = (info.location) ? info.location.name : null;

                            if (info.work && info.work.length > 0) {
                                if (info.work[0].employer && info.work[0].employer.name) {
                                    fbCompany = info.work[0].employer.name;
                                }
                                if (info.work[0].position && info.work[0].position.name) {
                                    fbWork = info.work[0].position.name;
                                }
                            }

                            var data = {
                                'FacebookId': info.id,
                                'FirstName': info.first_name,
                                'LastName': info.last_name,
                                'Name': info.first_name + " " + info.last_name,
                                'Email': info.email,
                                'Picture': "https://graph.facebook.com/" + info.id + "/picture",
                                'Gender': info.gender,
                                'Religion': (info.religion) ? info.religion : null,
                                'PoliticalView': (info.politics) ? info.politics : null,
                                'AccountType': "facebook",
                                'Address': fblocation,
                                'Birthday': info.birthday,
                                'UserName': (info.username) ? info.username : null,
                                'FacebookProfileUrl': "https://www.facebook.com/" + info.id,
                                'Company': fbCompany,
                                'Work': fbWork,
                                'Friends': friends,
                            };

                            apiHttpServices.set('LoginOrSignUpFacebook');
                            apiHttpServices.post(data).success(function(data) {
                                console.log("First auth with info : " + data);
                                if (data == "organization") {
                                    popupServices.show('danger', "This email '" + info.email + "' belongs to organization account please.Log in using email and password.");
                                    //unblockBody("body");
                                } else if (data == 'user') {
                                    popupServices.show('danger', "This email '" + info.email + "' belongs to another user account.");
                                    //unblockBody("body");
                                } else {
                                    //location.reload();
                                }

                            }, function(error) {

                            });
                        } else {
                            popupServices.show('danger', "Facebook didn't share your email with us maybe because it's not valid .. please use another social network.");
                            //unblockBody("body");
                        }
                    });
                } else {
                    //user cancelled login or did not grant authorization
                    //unblockBody("body");
                }
                $localStorage.accessToken = response.access_token;
                console.log(response);


            }, function(error) {

            });
        }
    };



}

module.exports = ['$cordovaOauth', '$localStorage', facebookAuth];
