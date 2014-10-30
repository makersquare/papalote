app.controller('UserDeniedController', ['$scope', 'User',
  function($scope, User){
    $scope.user = User.currentUser
  }]);