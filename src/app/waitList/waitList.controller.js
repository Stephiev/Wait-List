// Controllers where all the logic is, this is how we affect the view

(function () {
    'use strict';

    angular.module("app.waitList") // returns the waitList module

    // Everytime we go to /waitlsit, this controller will be created
    // Parameters are the name of the controller and a function that will be
    // a constructor for that controller.

    .controller('WaitListController', WaitListController)

    // This will make firebaseArray available to the function
    // These are positional, can add them to the actual function
    // with arbitrary names. This is strictly to protect against minification
    // Without the line below the app wil work fine since it's not minified, 
    // once minified it will break

    WaitListController.$inject = ['$firebaseArray'];

    function WaitListController($firebaseArray) {
        // Can reference the this of this instance in our code and be
        // very explicit about what we're referring to
        // Pointing to our object instance of this constructor
        // Called view model because it will be accessible in your view (HTML)

        var vm = this; // vm === viewModel

        // Want to make a connection to firebase and set it to a new
        // firebase instance. Connects our app to a specific firebase
        // app
        var fireParties = new Firebase('https://waitandeatsvvsdemo.firebaseio.com/parties');

        // Save text messages        
        var fireTextMessages = new Firebase('https://waitandeatsvvsdemo.firebaseio.com/textMessages');


        // Wrap this data inside an angular service called firebaseArray which is the
        // dependency we injected on line 18. This takes as parameters a fire base
        // referene, in this case it's fireParties as it's a reference to the data
        // for our app
        // Want to save it to a variable so we can reference it inside our view

        vm.parties = $firebaseArray(fireParties);

        // The constructor function, party

        function Party() {
            this.name = '';
            this.phone = '';
            this.size = '';
            this.done = false;
            this.notified = false;
        }

        // Adding properties
        vm.newParty = new Party()

        vm.addParty = addParty; // Allows the view to access the addParty function

        vm.removeParty = removeParty; // Remove party locally and from DB


        vm.sendTextMessage = sendTextMessage;

        // Functions
        function addParty() {
            vm.parties.$add(vm.newParty);
            vm.newParty = new Party();
        }

        function removeParty(party) {
            vm.parties.$remove(party);
        }


        function sendTextMessage(party) {

            //            console.log(phone)

        }

    }
})();

// Binds the value of an input to a value on your view model
// Firebase allows you to have a full backed app with a DB without having to write
// any server side code. Owned by google, so it's easy to use with angular (angularFire)
