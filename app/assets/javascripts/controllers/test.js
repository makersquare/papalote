app.controller('TestCtrl', ['$scope', 'AppRsc', 'User', function($scope, AppRsc, User){

  AppRsc.shout();
  AppRsc.shoutTwo();

  $scope.message = {
    notice: "Angular Stuff! Awesome!",
    error: AppRsc.error
  };

	$scope.user = User.get();
	$scope.user.$promise.then(function(data) {
		$scope.userName = data.name;
	});


}]);