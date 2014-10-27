app.controller('DocController', ['$scope','Doc', '$timeout', '$route','DocService', 'Download',
  function($scope, Doc, $timeout, $route, DocService, Download) {

  $scope.id = $route.current.params.id;
  $scope.doc = Doc.get({id: $route.current.params.id});
  $scope.titleEditDisable = true;
  $scope.saveComplete = false;
  $scope.downloadDoc = true;

  $scope.saveDoc = function(doc) {
    DocService.updateDoc(doc);
    $scope.saveComplete = true;
    $timeout(function() {
      $scope.saveComplete = false;
    }, 5000);
    $scope.download();
  };

  $scope.newDoc = function() {
    DocService.newDoc();
  };

  $scope.download = function(){
    Download.get({id: $scope.id}, function(data){
      $scope.file_name = './downloads/' + data.name;
    });
  }();
}]);
