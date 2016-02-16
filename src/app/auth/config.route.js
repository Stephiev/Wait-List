// Specifically used to set up routing
// We want to configure this behavior:
// When you hit the yourdomain.com/, go to the landing page

(function () {
    'use strict';

    // This is how you get the module, similar to the setter
    // but omit array of dependencies
    angular
        .module('app.auth')

    // Running configuration code, this method will run
    // on the object that's returned on line 11
    .config(configFunction)


    // We want access to the route provider (which was loaded in index.html, the
    // angular-route script tag) to set where the app should go based on the URL 
    // the user visits. We get access by grabbing the name of the function
    // and adding the '$inject' property and Angular will look for the dependencies given in
    // this array. It will make anything in the given array available to that function, in
    // this case 'configFunction'

    configFunction.$inject = ['$routeProvider'];

    // Function placed out here to avoid a huge anonymous function, makes it cleaner
    function configFunction($routeProvider) {
        // The 'when' method takes the URL you want to configure
        // and an object that has a couple properties. I'm using the 
        // tempalt4eUrl property where you give
        // the path to a file to load when you hit the given URL
        $routeProvider.when('/register', {
            templateUrl: "app/auth/register.html",
            controller: "AuthController",
            controllerAs: 'vm'
        });

        $routeProvider.when('/login', {
            templateUrl: "app/auth/login.html",
            controller: "AuthController",
            controllerAs: 'vm'
        });
    }
})()
