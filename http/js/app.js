'use strict';

/* App Module */

var rssReaderApp = angular.module('rssReaderApp', [
  'ngRoute',
  //'rssReaderAnimations',
  'rssReaderControllers',
  'rssReaderFilters',
  'rssReaderServices',
  'chart.js'
]);

rssReaderApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
