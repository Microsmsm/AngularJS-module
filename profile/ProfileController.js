/*jslint node: true */
'use strict';

/** @ngInject */
function ProfileController(apiHttpServices, $localStorage, $state) {

    var self = this;
    if (!$localStorage.accessToken || $localStorage.accessToken === '')
        $state.go('login');

    apiHttpServices.set('UserProfile/' + $localStorage.user.BrandName);

    //apiHttpServices.set('GetUserBrand');

    apiHttpServices.show()
        .then(function(serverData) {
                self.loginUser = serverData.data.model;
                $localStorage.user = self.loginUser;
                console.log(serverData.data.model);
                self.profilePic = 'http://ingraph.me/' + self.loginUser.Picture;
            },
            function(error) {
                self.error = true;
                //showAlert();
            });



    self.updateInfo = function() {
        //  var updateInfo = {
        //      'FirstName':self.loginUser.FirstName,
        //      'LastName':self.loginUser.LastName,
        //      'NickName':self.loginUser.NickName,
        //      'Age': self.loginUser.Age,
        //      'About': self.loginUser.About,
        //  }



        apiHttpServices.set('UpdateUserBasicInfo');
        apiHttpServices.store(self.loginUser)
            .then(function(serverData) {
                    console.log(serverData);
                },
                function(error) {
                    self.error = true;
                    //showAlert();
                });
    };

    self.updateSocialMedia = function() {

        apiHttpServices.set('UpdateUserSocialNeworks');
        apiHttpServices.store(self.loginUser.UserLinks)
            .then(function(serverData) {
                    console.log(serverData);
                },
                function(error) {
                    self.error = true;
                    //showAlert();
                });

    };

    self.updateLocation = function() {

    };

    self.updateWorkAndEducation = function() {
        //  var updateInfo = {
        //      'Work':self.loginUser.Work,
        //      'Education':self.loginUser.Education,
        //      'Phone':self.loginUser.Phone,
        //      'PhoneViewable': self.loginUser.PhoneViewable
        //  }



        apiHttpServices.set('UpdateUserBasicInfo');
        apiHttpServices.store(self.loginUser)
            .then(function(serverData) {
                    console.log(serverData);
                },
                function(error) {
                    self.error = true;
                    //showAlert();
                });
    };

    self.updateInterest = function() {

    };
}

module.exports = ['apiHttpServices', '$localStorage', '$state', ProfileController];
