app.controller('SearchResultsCtrl', ['$scope', 'SearchFactory',
  function($scope, SearchFactory) {
    $scope.results = SearchFactory.getResults;
    $scope.orderByField = 'name';
    $scope.reverseSort = true;
    $scope.orderByDocField = 'name';
    $scope.reverseDocSort = true;
}]);