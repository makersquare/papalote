console.log('loaded doc-new-controller.js');
app.controller('DocNewController', ['$scope','Doc', '$timeout', '$route', '$location', function($scope, Doc, $timeout, $route, $location){
  $scope.saveComplete = false;
  $scope.doc = new Doc();
  $scope.saveDoc = function(doc) {
    Doc.save(doc, function(data) {
      $location.path('/docs/' + data.id);
    });
  };
  $scope.newDoc = function () {
    $scope.doc = new Doc();
  };
}]);
