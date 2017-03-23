angular.module('app')

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('createAccountCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('myCardCtrl', ['$scope', '$stateParams', '$http', 'RootFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, RootFactory) {

        $scope.card = {}
        $scope.postMyCard = function() {
            console.log('card', $scope.card)
            $http({
                    method: 'POST',
                    url: "http://localhost:8000/card/",
                    headers: {
                        'Content-Type': 'application/JSON',
                        'Authorization': "Token " + RootFactory.getToken()
                    },
                    data: $scope.card
                })
                .then(res => console.log('res', res), err => console.log(err))

        }


    }
])

.controller('homeCtrl', ['$scope', '$stateParams', '$http', 'RootFactory', "$timeout", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, RootFactory, $timeout) {
        $scope.allCards = []
        console.log('gettokens', RootFactory.getToken())
        $http({
            method: 'GET',
            url: "http://localhost:8000/card/",
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': "Token " + RootFactory.getToken(),

            },


        })

        .then((res) => {
                $scope.keepCards();
                $scope.allCards.push(res.data.results)
                console.log('all cards', $scope.allCards)
                $timeout()
                return $scope.allCards

            },
            err => console.log(err))

        $scope.addTheirCard = function(search) {
            console.log('ran', $scope.allCards.length);
            var allCards = $scope.allCards[0]
            for (var i = 0; i < allCards.length; i++) {
                console.log("hi", allCards[i].email, search);
                if (allCards[i].email === search) {
                    console.log('scope email', allCards[i].email);
                    var email = { email: allCards[i].email }
                        // console.log('email', email)
                    $http({
                            method: 'POST',

                            url: "http://localhost:8000/card_contacts/",
                            headers: {
                                'Content-Type': 'application/JSON',
                                'Authorization': "Token " + RootFactory.getToken()
                            },

                            data: email

                        })
                        .then(res => {
                            $scope.cards = res.data;
                            $timeout();
                            return $scope.cards
                        }, err => console.log(err))
                    console.log('post happened');

                }
            }
        }

        $scope.keepCards = function() {
            $http({
                method: 'GET',
                url: "http://localhost:8000/card_contacts/",
                headers: {
                    'Content-Type': 'application/JSON',
                    'Authorization': "Token " + RootFactory.getToken(),

                },
            }).then(res => {
                $scope.savedCards = res.data.results;
                $timeout();
                console.log('SAVED CARDS', $scope.savedCards)
                return $scope.savedCards
            })

        }

    }

])
