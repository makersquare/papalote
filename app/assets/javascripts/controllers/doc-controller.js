app.controller('DocController', ['$scope','Doc', '$timeout', '$route',
  'DocService', '$location', function($scope, Doc,
    $timeout, $route, DocService, $location) {
  $scope.id = $route.current.params.id;
  $scope.doc = Doc.get({id: $route.current.params.id});
  $scope.doc.$promise.then(function(data){
    currentFolderId = data.folder_id
    $scope.backToParentView = !!currentFolderId;
  });

  $scope.titleEditDisable = true;
  $scope.saveComplete = false;
  $scope.downloadDoc = true;
  $scope.backToParentView = true;
  $scope.chatContainer = true;
  $scope.showChat = true;

  $scope.saveDoc = function(doc) {
    DocService.updateDoc(doc);
    $scope.titleEditDisable = true;
    $scope.saveComplete = true;
    $timeout(function() {
      $scope.saveComplete = false;
    }, 5000);
    $scope.createDownloadFile();
  };

  $scope.newDoc = function() {
    DocService.newDoc();
  };

  $scope.createTempFile = function(doc) {
    DocService.updateDoc(doc);
    DocService.createTempFile(doc.id);
  };

  $scope.editName = function() {
    $scope.titleEditDisable = false;
  };

  $scope.findParentFolder = function(){
    $location.path('/folders/' + currentFolderId);
  };

  $scope.toggleChatDisplay = function(){
    $scope.showChat = !$scope.showChat;
  };
}]);
