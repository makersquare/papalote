app.controller('DocController', ['$scope','Doc', '$timeout', '$route','DocService', 'Download', '$location',
  function($scope, Doc, $timeout, $route, DocService, Download, $location) {

  $scope.id = $route.current.params.id;
  $scope.doc = Doc.get({id: $route.current.params.id});
  $scope.doc.$promise.then(function(data){
    $scope.currentFolderId = data.folder_id
    if ($scope.currentFolderId === null) {
      $scope.backToParentView = false;
    }
    else {
      $scope.backToParentView = true;
    }
  });
  $scope.titleEditDisable = true;
  $scope.saveComplete = false;
  $scope.downloadDoc = true;
  $scope.backToParentView = true;

  $scope.saveDoc = function(doc) {
    DocService.updateDoc(doc);
    $scope.saveComplete = true;
    $timeout(function() {
      $scope.saveComplete = false;
    }, 5000);
    $scope.createDownloadFile();
  };

  $scope.newDoc = function() {
    DocService.newDoc();
  };

  $scope.createDownloadFile = function(){
    Download.get({id: $scope.id}, function(data){
      $scope.file_name = './downloads/' + data.name;
    });
  };

  $scope.createDownloadFile();

  $scope.findParentFolder = function(folder_id){
    $location.path('/folders/' + folder_id);
  };
}]);
