console.log('loaded doc-controller.js');
app.controller('DocController', ['$scope','Doc', '$timeout', '$route', '$location', function($scope, Doc, $timeout, $route, $location){
  $scope.doc = Doc.get({id: $route.current.params.id});
  $scope.saveComplete = false;
  $scope.saveDoc = function(doc) {
    Doc.update(doc);
    $scope.saveComplete = true;
    $timeout(function(){
      $scope.saveComplete = false;
    }, 5000);
  };
  $scope.newDoc = function () {
    $location.path('/docs/new');
  };
}]);
