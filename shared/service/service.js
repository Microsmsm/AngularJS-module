/*jslint node: true */
/*global angular*/
'use strict';

module.exports = angular.module('service', [])
  .factory('apiHttpServices', require('./apiHttpServices'))
  .factory('facebookAuth', require('./facebookAuth'))
  .factory('googleAuth', require('./googleAuth'))
  .factory('popupServices', require('./popupServices'));
