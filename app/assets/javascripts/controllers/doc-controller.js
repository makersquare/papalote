app.controller('DocController', ['$scope','Doc', '$timeout', '$route','DocService',
  function($scope, Doc, $timeout, $route, DocService) {
  $scope.doc = Doc.get({id: $route.current.params.id}, function(data) {
    DocService.newLineCount(data.content);
  });
  $scope.titleEditDisable = true;
  $scope.saveComplete = false;
  $scope.saveDoc = function(doc) {
    DocService.updateDoc(doc);
    $scope.saveComplete = true;
    $timeout(function() {
      $scope.saveComplete = false;
    }, 5000);
  };
  $scope.newDoc = function () {
    DocService.newDoc();
  };
}]);
