app.controller('UploadController', ['$scope', 'Doc', 
  function($scope, Doc){

  $scope.file = {};
  $scope.file.src = "";

  $scope.upload = function(file) {
    console.log('calling upload on' + file);
    Doc.save({doc: file}, function(response) {
      console.log(response)
    }); 
  };

}]);
