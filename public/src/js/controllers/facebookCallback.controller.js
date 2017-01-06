appControllers.controller('facebookCallbackCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'authService',
    function ($scope, $rootScope, $state, $stateParams, authService) {

        var fbCode = $stateParams.code;
        authService.loginFacebook(fbCode, (err, result) => {
            if (err) return console.error(err);
            $rootScope.refreshLoginState();
            $state.go('main');
        });
    }
]);