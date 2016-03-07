(function () {
    'use strict';

    // User .factory to register a more complicated service.
    // Generally services return and object with useful methods
    angular.module('app.core')
        .factory('partyService', partyService);

    partyService.$inject = ['$firebaseArray', 'firebaseDataService'];

    function partyService($firebaseArray, firebaseDataService) {
        // Return the object that will be injected throughout the app
        // By injecting the service you're essentially injecting this returned object
        // Factories for configurable objects you want to use throughout the app
        // and of course .constants for constants.

        // Firebase instances have a method called child that let's you specify 
        // where you want to actually go

        // firebaseArray is needed so we can access methods like $add, $save

        var service = {
            Party: Party,
            getPartiesByUser: getPartiesByUser
                // parties: $firebaseArray(firebaseDataService.root.child('parties')) // Allows us to hev  methods like $save and $add
        };

        return service;

        ////////////////

        // The constructor function, party

        function Party() {
            this.name = '';
            this.phone = '';
            this.size = '';
            this.done = false;
            this.notified = false;
        }

        function getPartiesByUser(uid) {
            return $firebaseArray(firebaseDataService.users.child(uid).child('parties'))
        }
    }
})();
