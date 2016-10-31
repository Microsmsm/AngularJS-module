app.controller('LogoutController', function ($location, $scope, $window) {
     apiHttpServices.destroy('Logoff');
    $window.localStorage.clear();
    FB.logout(function(response) {});
    $location.path('/login');
});