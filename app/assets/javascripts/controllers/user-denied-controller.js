app.controller('UserDeniedController', ['$scope', '$location', 'User',
  function($scope, $location, User){
    $scope.user = User.currentUser;
    $scope.viewUserPage = function() {
      $location.path("/users/"+$scope.user.id+'/contents');
    }
  }]);