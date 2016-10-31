/*jslint node: true */
/*global angular*/
'use strict';

module.exports = angular.module('directives', [])
  .directive('errorDirective', require('./errorDirective'));
