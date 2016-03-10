// Specifically used to set up routing
// We want to configure this behavior:
// When you hit the yourdomain.com/, go to the landing page

(function () {
    'use strict';

    // This is how you get the module, similar to the setter
    // but omit array of dependencies
    angular
        .module('app.waitList')

    // Running configuration code, this method will run
    // on the object that's returned on line 11
    .config(configFunction)


    // We want access to the route provider (which was loaded in index.html, the
    // angular-route script tag) to setup where the app should go based on the URL 
    // the user visits. We get access by grabbing the name of the function
    // and adding the '$inject' property. Angular will look for the dependencies given in
    // the array assigned to the '$inject' property. It will make anything in the given array 
    // available to that function, in this case '$routeProvider' becomes 
    // available to 'configFunction'

    configFunction.$inject = ['$routeProvider'];

    // Function placed out here to avoid a huge anonymous function, makes it cleaner
    function configFunction($routeProvider) {
        // The 'when' method takes the URL you want to configure
        // and an object that has a couple properties. I'm using the 
        // tempalt4eUrl property where you give
        // the path to a file to load when you hit the given URL
        $routeProvider.when('/waitlist', {
            templateUrl: 'app/waitList/waitList.html',
            controller: 'WaitListController',
            controllerAs: 'vm',
            resolve: {
                user: resolveUser
            }
        });
    }

    // "resolve" is used to help lockdown our waitlist page, only logged in usesrs can access it
    // Using this object you can specify things you want to inject into the controller using
    // dependency injection. The controller will only load if the given function resolves successfully
    // If the promise resolves successfully then the controller will load and the user
    // will be set to the return value of the resolved data. If the promise is rejected, aka no logged in user
    // then the controller won't even load

    resolveUser.$inject = ['authService'];

    // $waitForAuth() will wait for the promise to resolve, and will not require the user to actually be logged in. This // makes it useful when you want to check if the user is logged in or not, and then do something accordingly.

    //  $requireAuth() will require the user to be logged in or the promise will be rejected. Useful for
    // securing routes where the user needs to be logged in.

    function resolveUser(authService) {
        return authService.firebaseAuthObject.$requireAuth();

    }

    // resolveUser will broadcast a $routeChangeError and we can listen to it, but it's broadcasted 
    // on the $rootScope so to listen to it we need to inject the $rootScope. $rootScope is the scope 
    // that's visible throughout the entire app. Way to communicate throughout the entire app, with all
    // the controllers


})()
