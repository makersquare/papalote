
app.controller('SearchResultsCtrl', ['$scope', '$routeParams','searchFactory',
  function($scope, $routeParams, searchFactory) {

    $scope.folders = [];
    $scope.documents = [];

    searchFactory.find($routeParams.keywords).then(function(obj) {
      $scope.folders = obj.data.folders;
      $scope.documents = obj.data.docs;
    }); 
}]);


