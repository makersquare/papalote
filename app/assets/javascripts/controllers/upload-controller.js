app.controller('UploadController', ['$scope', '$location', '$flow', 'flowFile', 
  function($scope, $location, $flow, flowFile){

  $scope.$on('flow::complete', function(event, $flow, flowFile){
    event.preventDefault();
    // $location.path('/');
  });
}]);