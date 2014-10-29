app.controller('SearchResultsCtrl', ['$scope', '$routeParams','SearchFactory',
  function($scope, $routeParams, SearchFactory) {
    $scope.folders = [];
    $scope.documents = [];

    SearchFactory.find($routeParams.keywords).then(function(obj) {
      $scope.folders = obj.data.folders;
      $scope.documents = obj.data.docs;
    }); 
}]);