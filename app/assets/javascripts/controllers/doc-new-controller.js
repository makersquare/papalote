app.controller('DocNewController', ['$scope','Doc', '$timeout', '$route', 'DocService',
  function($scope, Doc, $timeout, $route, DocService) {
  $scope.rowNumber = 20;
  $scope.saveComplete = false;
  $scope.titleEditDisable = false;

  $scope.doc = new Doc();

  $scope.saveDoc = function(doc) {
    DocService.newDocSave(doc);
  };
  $scope.newDoc = function () {
    $scope.doc = new Doc();
    DocService.newDoc();
  };
}]);
