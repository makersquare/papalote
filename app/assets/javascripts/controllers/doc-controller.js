app.controller('DocController', ['$scope','Doc', '$timeout', '$route','DocService',
  function($scope, Doc, $timeout, $route, DocService) {
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
