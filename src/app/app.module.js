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
    'app.auth',
    'app.layout'

  ])
        .config(configFunction) // Happens before a lot of the application is built
        .run(runFunction);

    // Redirect to HP if trying to access a non-existent page

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        })
    }


    // Run is like running any kind of code you want after the app is configured
    runFunction.$inject = ['$rootScope', '$location']; // Need $location to redirect to homepage

    // This function will listen to the routeChangeError broadcasted by resolveUser in waitlist/configRoute
    function runFunction($rootScope, $location) {

        $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the home page
            if (error === 'AUTH_REQUIRED') {
                $location.path('/')
            }
        })
    };
})();
