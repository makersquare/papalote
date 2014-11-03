app.controller('NavBarController', ['$scope', 'User', 
  function($scope, User) {
    User.currentUser.$promise.then(function(data) {
      $scope.user = data;
      $scope.guest = data.guest;
    });
}]);