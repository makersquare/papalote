app.controller('DocNewController', ['$scope','Doc', '$timeout', '$route', 'DocService',
  function($scope, Doc, $timeout, $route, DocService) {

  $scope.saveComplete = false;
  $scope.titleEditDisable = false;
  $scope.downloadDoc = false;
  $scope.chatContainer = false;

  $scope.saveDoc = function(doc) {
    DocService.newDocSave(doc);
  };

  $scope.newDoc = function () {
    $scope.doc = new Doc();
    DocService.newDoc();
  };
}]);
