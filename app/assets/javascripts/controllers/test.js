app.controller('TestCtrl', ['$scope', 'AppRsc', function($scope, AppRsc){

  AppRsc.shout();
  AppRsc.shoutTwo();

  $scope.message = {
    notice: "Angular Stuff! Awesome!",
    error: AppRsc.error
  };


}]);