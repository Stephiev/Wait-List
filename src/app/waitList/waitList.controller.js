// Controllers where all the logic is, this is how we affect the view
// Want to keep them as small as possible, once they start getting too large
// start moving to services

// Services are singletons that persist throughout the lifetime of the application,
// while controllers are transient between application states.

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

    WaitListController.$inject = ['partyService', 'textMessageService'];

    function WaitListController(partyService, textMessageService) {
        // Can reference the this of this instance in our code and be
        // very explicit about what we're referring to
        // Pointing to our object instance of this constructor
        // Called view model because it will be accessible in your view (HTML)

        var vm = this; // vm === viewModel

        // Want to make a connection to firebase and set it to a new
        // firebase instance. Connects our app to a specific firebase
        // app
        //        var fireParties = partyService.partiesnew Firebase(FIREBASE_URL + 'parties');

        // Save text messages        
        //        var fireTextMessages = new Firebase(FIREBASE_URL + 'textMessages');


        // Wrap this data inside an angular service called firebaseArray which is the
        // dependency we injected on line 18. This takes as parameters a fire base
        // referene, in this case it's fireParties as it's a reference to the data
        // for our app
        // Want to save it to a variable so we can reference it inside our view

        vm.parties = partyService.parties;

        // Moved to partyService.js
        // The constructor function, party

        //        function Party() {
        //            this.name = '';
        //            this.phone = '';
        //            this.size = '';
        //            this.done = false;
        //            this.notified = false;
        //        }

        // Adding properties
        vm.newParty = new partyService.Party()

        vm.addParty = addParty; // Allows the view to access the addParty function

        vm.removeParty = removeParty; // Remove party locally and from DB

        vm.sendTextMessage = sendTextMessage;

        vm.toggleDone = toggleDone;

        // Functions
        function addParty() {
            vm.parties.$add(vm.newParty);
            vm.newParty = new partyService.Party();
        }

        function removeParty(party) {
            vm.parties.$remove(party);
        }

        function sendTextMessage(party) {
            textMessageService.sendTextMessage(party, vm.parties)
                //            var newTextMessage = {
                //                phoneNumber: party.phone,
                //                size: party.size,
                //                name: party.name
                //            };
                //
                //            firebaseDataService.textMessages.push(newTextMessage)
                //            party.notified = true // local change
                //            vm.parties.$save(party) // save the local changes up to firebase
                //                //            console.log(phone)
                //
        }

        function toggleDone(party) {
            vm.parties.$save(party); // save local changes up to firebase
        }

    }
})();

// Binds the value of an input to a value on your view model
// Firebase allows you to have a full backed app with a DB without having to write
// any server side code. Owned by google, so it's easy to use with angular (angularFire)
