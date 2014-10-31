app.controller('UserController', ['$scope', 'User',
  function($scope, User){
    $scope.user = User.currentUser
  }]);