app.controller('DocController', ['$scope','Doc', '$timeout', '$route','DocService',
  function($scope, Doc, $timeout, $route, DocService) {
  $scope.doc = Doc.get({id: $route.current.params.id}, function(data) {
    DocService.lineNumber = data.content.split("\n").length;
    if (DocService.lineNumber > 20) {
      $scope.rowNumber = DocService.lineNumber;
    } else {
      $scope.rowNumber = 20;
    }
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
