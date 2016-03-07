// Controllers where all the logic is, this is how we affect the view
// PROMISES

(function () {
    'use strict';

    angular
        .module('app.auth') // returns the waitlist module

    // Everytime we go to /waitlsit, this controller will be created
    // Parameters are the name of the controller and a function that will be
    // a constructor for that controller.

    .controller('AuthController', AuthController);

    // This will make firebaseArray available to the function
    // These are positional, can add them to the actual function
    // with arbitrary names. This is strictly to protect against minification
    // Without the line below the app wil work fine since it's not minified, 
    // once minified it will break

    // Angular services, third party services then custom services

    AuthController.$inject = ['$location', 'authService']; // Safe from minification

    function AuthController($location, authService) {
        var vm = this;
        //        var firebaseReference = new Firebase(FIREBASE_URL);
        // Will have all the register/authentication methods on it, AngularFire

        //        var firebaseAuthObject = $firebaseAuth(firebaseReference);

        vm.user = {
            email: '',
            password: ''
        };

        vm.register = register;
        // A promise is a method of resolving a value (or not) in an asynchronous  
        // manner

        vm.login = login;

        vm.logout = logout;

        vm.isLoggedIn = authService.isLoggedIn

        // 1. Success: Firebase creates the new user.
        // Run a success function

        // 2. Error: FB can create a user because username already exists
        // Run anerror password

        function register(user) {
            // createUser returns a promise
            // Rather than depending
            // upon a callback to fire, we can interact with the data as though it has already returned.
            //            return firebaseAuthObject.$createUser(user)
            return authService.register(user)
                .then(function () { // Had to remove 'user' as a parameter so it does not override 
                    // the original 'user'
                    vm.login(user)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

        // This method returns a promise which is resolved or rejected when the authentication attempt 
        // is completed.If successful, the promise will be fulfilled with an object containing 
        // authentication data about the logged - in user.If unsuccessful, the promise will be 
        // rejected with an Error object.


        function login(user) {
            return authService.login(user)
                .then(function (authData) {
                    console.log("Logged in as:", authData.uid);
                    $location.path('/waitlist')
                }).catch(function (error) {
                    console.error("Authentication failed:", error);
                });

        }

        function logout() {
            authService.logout()
                // Redirect to landing page, '/', upon logging out
            $location.path('/')

        }


    }

})();
