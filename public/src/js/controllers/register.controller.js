appControllers.controller('registerCtrl', ["$scope", 
    function($scope) {
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.gender = '';
        $scope.email = '';
        $scope.password = '';
        $scope.signUp = function () {
            $.ajax("http://127.0.0.1:1337/api/auth/register",{
            method: "POST",
            data: {
                name: $scope.firstName + ' ' + $scope.lastName,
                email: $scope.email,
                password: $scope.password
            },
        })
        }
    }
]);