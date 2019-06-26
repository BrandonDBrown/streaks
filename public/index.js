// index.js
angular.module('habitApp', [])
  .controller('indexCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
   // Initialize variables 
   $scope.enterMinion = function() {
    $http.post('/api/accounts', { "username" : $scope.moniker }).then(function(response) {
      console.log(response.data[0]._id)
      $location.path('/api/account/' +response.data[0]._id);
    }, function(response) {
      console.log(response)
    });
  }
}])