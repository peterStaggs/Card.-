angular.module('app').controller('AuthController', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    '$timeout',


    function($scope, $http, $location, RootFactory, $timeout) {
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
                    RootFactory.setToken(res.data.token);
                    console.log(RootFactory.getToken());
                    // if (res.data.success === true) {
                    //     $location.path('/home');
                    // }
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
                    RootFactory.setToken(res.data.token);
                    console.log(RootFactory.getToken());
                    console.log("LOGIN SUCCESS", res);
                    $location.path('/home');
                    console.log('hey there')
                },
                console.error
            );
        };

        $scope.logout = function() {
            RootFactory.destroyToken();
            console.log(RootFactory.getToken(), "TOKEN ELIMINATED. YOU'VE BEEN LOGGED OUT")
            $location.path("/login")
        };

        
      

    }
]);
