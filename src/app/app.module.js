// The module needs two parameters, the name of the module and an array of
// all its dependencies 
// eg angular.module('myApp', []);

// Name has to match with the value you give to ng-app

// Variables are now hidden and cannot be leaked out into other 
// files by wrapping it in an IIFE... but there's no variables in 
// in the IFFE right now... ?

(function () {
    angular
        .module('app', [
    // Angular modules.
    'ngRoute',

    // Third-party modules.
    'firebase',

    // Custom modules.
    'app.landing',
    'app.core',
    'app.waitList',
    'app.auth'

  ]);
})();
