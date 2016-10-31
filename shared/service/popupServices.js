/*jslint node: true */
'use strict';

/** @ngInject */
function popupServices($ionicPopup, $timeout) {

    return {
        show: function(title, message) {

            var alertPopup = $ionicPopup.alert({
                title: title,
                template: message
            });

            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });

        }
    };



}

module.exports = ['$ionicPopup', '$timeout', popupServices];
