app.controller('NavBarController', ['$scope', 'User', 
  function($scope, User) {
    User.currentUser.then(function(data) {
      $scope.user = data;
      $scope.guest = data.guest
    });
}]);