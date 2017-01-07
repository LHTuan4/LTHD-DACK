appControllers.controller('registerCtrl', [ '$scope', '$rootScope', '$state', 'authService',
    function ($scope, $rootScope, $state, authService) {
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.gender = '';
        $scope.email = '';
        $scope.password = '';

        console.log($scope.firstName);
        console.log($scope.password);
        $scope.signUp = function () {
            authService.register(
                $scope.firstName + ' ' + $scope.lastName,
                $scope.email,
                $scope.password,
                (err, response) => {
                    if (err) {
                        console.log('Failed register:', err);
                        window.alert('Dang ky that bai:', err);
                        return;
                    }
                    console.log('DKY THANH CONG', response);
                    authService.loginLocal($scope.email, $scope.password, (err, token) => {
                        if (err) return console.error(err);
                        $rootScope.refreshLoginState();
                        $state.go('main');
                    });
                });
        }
    }
]);