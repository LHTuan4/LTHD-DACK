appControllers.controller('navBarCtrl', ['$scope', '$rootScope', '$state', 'authService',
    function ($scope, $rootScope, $state, authService) {

        $scope.isAuthenticated = authService.isAuthenticated();
        var refreshLoginState = function () {
            if ($scope.isAuthenticated) {
                authService.getAccount((err, result) => {
                    if (err) return console.error(err);
                    $scope.username = result.account.email;
                    $scope.$apply();
                })
            }
        };

        refreshLoginState();


        // Preauth
        $scope.email = '';
        $scope.password = '';

        $scope.loginLocal = function () {
            authService.loginLocal($scope.email, $scope.password, (err, token) => {
                if (err) return console.log(err);
                $scope.isAuthenticated = true;
                refreshLoginState();
                $state.go('main');
            })
        }

        // $scope.loginFacebook = function() {
        //     authService.loginFacebook((err, token) => {
        //         if (err) return console.log(err);
        //         $scope.isAuthenticated = true;
        //         $state.go('main');
        //     })
        // }

        // Auth
        $scope.username = '';
        $scope.logout = function () {
            authService.logout((err) => {
                if (err) return console.error(err);
                $scope.isAuthenticated = false;
                refreshLoginState();
                $state.go('home');
            });
        }
    }
]);