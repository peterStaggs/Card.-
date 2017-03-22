angular.module('app').controller('AuthController', [
    '$scope',
    '$http',
    '$location',
    function($scope, $http, $location) {
        $scope.user = {
            username: '',
            password: ''
        }
        $scope.register = function() {
            $http({
                url: "http://localhost:8000/register/",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    "username": $scope.user.username,
                    "password": $scope.user.password
                }
            }).then(
                res => {
                    if (res.data.success === true) {
                        $location.path('/products');
                    }
                },
                err => console.log("error", err)
            );
        };


        $scope.login = function() {
            $http({
                url: "http://localhost:8000/api-token-auth/",
                method: "POST",
                data: {
                    "username": $scope.user.username,
                    "password": $scope.user.password
                }
            }).then(
                res => {
                    console.log("LOGIN SUCCESS", res);

                    $location.path('/createAccount');
                    console.log('hey there')
                },
                console.error
            );
        };

    }
]);
