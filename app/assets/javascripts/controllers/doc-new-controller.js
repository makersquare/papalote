console.log('loaded doc-new-controller.js');
app.controller('DocNewController', ['$scope','Doc', '$timeout', '$route', function($scope, Doc, $timeout, $route){
  $scope.saveComplete = false;
  $scope.doc = new Doc();
  $scope.saveDoc = function(doc) {
    Doc.save(doc);
    $scope.saveComplete = true;
    $timeout(function(){
      $scope.saveComplete = false;
    }, 5000);
  };
  $scope.newDoc = function () {
  $scope.doc = new Doc();
  };
}]);
