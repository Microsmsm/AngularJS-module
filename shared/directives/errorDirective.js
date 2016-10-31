/*jslint node: true */
'use strict';

/** @ngInject */
function errorDirective() {

    function directiveController() {
        var vm = this;

        init();

        function init() {

        }
    }

    function link() {

    }

    return {
        bindToController: true,
        controller: directiveController,
        controllerAs: 'Ctrl',
        link: link,
        restrict: 'AE',
        scope: {},
    };
}



module.exports = [errorDirective];
