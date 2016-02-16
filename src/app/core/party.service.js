// handling parties

(function () {
    'use strict'

    // Grab the angular library and the module we want to attach the service to
    angular
        .module('app.core')

    // register a more complicated service using factory, with more methods/properties you want to 
    // return an object. This factory service will return an object
    .factory('partyService', partyService)
        // Will reference the function below, it's easier to read when the function
        // paramter is pulled out as a named function 

    partyService.$inject = ['$firebaseArray', 'firebaseDataService'];

    function partyService($firebaseArray, firebaseDataService) {
        // return an object that will be injected throughout the app, injecting this service
        // will be injecting the object retuned by this function 



        // Wrap this data inside an angular service called firebaseArray which is the
        // dependency we injected on line 18. This takes as parameters a fire base
        // referene, in this case it's fireParties as it's a reference to the data
        // for our app
        // Want to save it to a variable so we can reference it inside our view


        var service = {
            Party: Party,
            parties: $firebaseArray(firebaseDataService.root.child('parties'))
        };



        //        https://www.firebase.com/docs/web/api/firebase/child.html, elongating the path


        return service;

        ///////////////////////////////////

        // The constructor function, party

        function Party() {
            this.name = '';
            this.phone = '';
            this.size = '';
            this.done = false;
            this.notified = false;
        }

    }

})();
