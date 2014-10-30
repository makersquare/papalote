app.controller('TestCtrl', ['$scope', 'AppRsc', 'User', function($scope, AppRsc, User){

  AppRsc.shout();
  AppRsc.shoutTwo();

  $scope.message = {
    notice: "Angular Stuff! Awesome!",
    error: AppRsc.error
  };

  $scope.current = User.currentUser;

}]);