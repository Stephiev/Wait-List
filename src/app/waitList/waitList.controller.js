// Controllers where all the logic is, this is how we affect the view

(function () {
    'use strict';

    angular.module("app.waitList") // returns the waitList module

    // Everytime we go to /waitlsit, this controller will be created
    // Paramteres are the name of the controller and a function that will be
    // a constructor for that controller.

    .controller('WaitListController', WaitListController)

    // This will make firebassArray available to the function
    // These are positional, can add them to the actual function
    // with random, arbitrary names
    waitListController.$inject = ['firebaseArray'];

    function WaitListController($firebaseArray) {
        // Can reference the this of this instance in our code and be
        // very explicit about what we're referring to
        // Poitning to our object instance of this constructor
        // Called view model because it will be accessible in your view
        // as in your HTML
        var vm = this; // vm = viewModel

        // Want to make a connection tor firebase and set it to a new
        // firebase instance. Connects our app to a specific firebase
        // app
        var fireParties = new Firebase('https://waitandeatsvvsdemo.firebaseio.com/');

        // Wrap this data inside an angular service called firebaseArray which is the
        // dependency we injected on line 30. This takes as a parameters a fire base
        // referene, in this case it's fireParties as it's a reference to the data
        // for our app
        // Want to save it to a variable so we can reference it inside our view

        vm.parties = $firebaseArray(fireParties);

        vm.addParty = addParty; // Allows the view to access the addParty function

        function addParty() {
            vm.parties.push('another');
        }


    }



})();


// Firebase allows you to have a full backed app with a DB without having to write
// any server side code. Owned by google, so it's easy to use with angular (angularFire)
