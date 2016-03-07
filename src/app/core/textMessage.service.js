(function () {
    'use strict';

    angular.module('app.core')
        .factory('textMessageService', textMessageService)

    textMessageService.$inject = ['firebaseDataService']

    function textMessageService(firebaseDataService) {

        var service = {
            sendTextMessage: sendTextMessage
        };

        return service;

        /////////////

        function sendTextMessage(party, parties) {
            var newTextMessage = {
                phoneNumber: party.phone,
                size: party.size,
                name: party.name
            };

            firebaseDataService.textMessages.push(newTextMessage)
            party.notified = true // local change
                // vm.parties.$save(party)
                // We don't have access to the view model, 
                // that's only available in the controller, so 
                // we need to add another parameter to get access to it
            parties.$save(party)
        }
    }
})();
