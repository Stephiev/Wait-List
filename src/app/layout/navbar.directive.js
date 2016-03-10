(function () {
    'use strict';

    angular.module('app.layout')
        .directive('svNavbar', svNavbar)

    function svNavbar() {
        return {
            templateUrl: 'app/layout/navbar.html',
            restrict: 'E',
            scope: {},
            controller: NavbarController,
            controllerAs: 'vm'
                // reference a file for a template
                // tells angular how we're going to use this directive ACME (attribute, element name, comment or CSS class)
        }
    }

    NavbarController.$inject = ['$location', 'authService']

    function NavbarController($location, authService) {
        var vm = this;

        vm.isLoggedIn = authService.isLoggedIn;
        vm.logout = logout;

        function logout() {
            authService.logout();
            $location.path('/');
        }
    }

    //    }
})();


// Why can't/don't you use authcontroller on this directive if it was the one used in the HTML?
// Better way to organize the code, you can see the controller inside thise file. You don't have to
// go to the HTML to see the controller.


// Don't have NavbarController in quotes
//yeah so now youre referring to the function by its variable name
//Gordon Zhu: rather by depending on angular to find it by a string

// Isolating the scope of the navbar directive
// Allows this directive to only access the data defined in this controller
// If it's not isolated you can access data on the parent controller, and alter it
// by accident. If you do need data from the parent controller you can do that by 
// explicitly passing in the values you need, this is best practice
// Allows you to still access the data on the parent but you are really explicit about it
