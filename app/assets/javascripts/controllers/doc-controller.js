app.controller('DocController', ['$scope','Doc', '$timeout', '$route','DocService', 'Download', '$location',
  function($scope, Doc, $timeout, $route, DocService, Download, $location) {

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

  $scope.downloadFile = function(doc) {
    DocService.updateDoc(doc);
    Download.get({id: $scope.id}, function(){
    });
  };

  $scope.editName = function() {
    $scope.titleEditDisable = false;
  };

  $scope.findParentFolder = function(){
    $location.path('/folders/' + currentFolderId);
  };
}]);
