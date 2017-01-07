appControllers.controller('navBarCtrl', ['$scope', '$rootScope', '$state', 'authService',
    function ($scope, $rootScope, $state, authService) {

        $scope.isAuthenticated = authService.isAuthenticated();
        $rootScope.refreshLoginState = function () {
            authService.getAccount((err, result) => {
                if (err) {
                    console.log('Failed login:', err);
                    return;
                }
                
                $scope.isAuthenticated = authService.isAuthenticated();
                if ($scope.isAuthenticated) {
                    console.log('Refresh Login State');
                    $scope.username = result.account.email;
                    $rootScope.$apply();
                }
            });
        };

        $rootScope.refreshLoginState();


        // Preauth
        $scope.email = '';
        $scope.password = '';

        $scope.loginLocal = function () {
            authService.loginLocal($scope.email, $scope.password, (err, token) => {
                if (err) {
                    console.log('Fail login:', err);
                    window.alert('Dang nhap that bai');
                    return;
                }
                $scope.isAuthenticated = true;
                $rootScope.refreshLoginState();
                $state.go('main');
            });
        };

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
                $rootScope.refreshLoginState();
                $state.go('home');
            });
        };
        $scope.register = function () {
            $state.go('register');
        };
        $scope.searchReviewTb = '';
        $scope.searchReview = function () {
            $state.go('review');
        };
    }
]);