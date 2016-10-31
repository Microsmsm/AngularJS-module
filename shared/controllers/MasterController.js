/*jslint node: true */
'use strict';

/** @ngInject */
function MasterController($localStorage, $state, $translate) {
    var self = this;
    self.isLogin = ($localStorage.accessToken && $localStorage.accessToken !== '') ? true : false;

    if (self.isLogin) {

        self.profileName = $localStorage.user.Name;

        self.profilePic = 'http://ingraph.me/' + $localStorage.user.Picture;

        // COLLAPSE =====================
        self.isCollapsed = true;

    }

    self.ChangeLanguage = function(lang) {
        window.localStorage.lang = lang;
        $translate.use(lang);

    };

}

module.exports = ['$localStorage', '$state', '$translate', MasterController];
