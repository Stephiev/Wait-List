// Made service to deliver firebase URL
// If you have a new firebase app you can change the URL in this single file and
// it will be seen throughout the app
(function () {
    'use strict';

    // Want to add a service to app.core
    angular.module('app.core') // returns the core module
        .constant('FIREBASE_URL', 'https://waitandeatsvvsdemo.firebaseio.com/');

})();
