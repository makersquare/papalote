app.controller('SearchBarController', ['$scope', '$location', 'SearchFactory', '$route',
  function($scope, $location, SearchFactory, $route){
    $scope.search = function(event) {
      if (event.which === 13) {
        $scope.clickSearch();
      }
    };
    $scope.clickSearch = function() {
      SearchFactory.find($scope.sq.keywords);
      if ($location.path() !== '/search') {
        $location.path('/search');
      }
    };
}]);