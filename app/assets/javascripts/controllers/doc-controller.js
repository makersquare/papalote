console.log('loaded doc-controller.js');
app.controller('DocController', ['$scope','Doc', '$timeout', function($scope, Doc, $timeout){
  $scope.saveComplete = false;
  $scope.saveDoc = function(doc) {
    Doc.save(doc);
    $scope.saveComplete = true;
    $timeout(function(){
      $scope.saveComplete = false;
    }, 5000);
  };
  $scope.newDoc = function () {
    $scope.doc = new Doc();
  }
}]);
