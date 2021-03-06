    // Creates a reference to the firebase DB


    (function () {
        'use strict';

        // Returns the actual module
        // Factory takes a name and a function
        angular.module('app.core')
            .factory('firebaseDataService', firebaseDataService)

        firebaseDataService.$inject = ['FIREBASE_URL'];

        function firebaseDataService(FIREBASE_URL) {
            var root = new Firebase(FIREBASE_URL);

            var service = {
                root: root,
                emails: root.child('emails'),
                textMessages: root.child('textmessages'),
                users: root.child('users')
            };

            return service;
        }
    })();
