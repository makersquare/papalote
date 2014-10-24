app.controller('DocNewController', ['$scope','Doc', '$timeout', '$route', 'DocService',
  function($scope, Doc, $timeout, $route, DocService) {
  $scope.load = Doc.get({id: 1}, function() {
     DocService.newLineCount('');
     $scope.lineNumber = 20;
  });
  $scope.saveComplete = false;
  $scope.titleEditDisable = false;

  $scope.doc = new Doc();
  $scope.saveDoc = function(doc) {
    DocService.newDocSave(doc);
  };
  $scope.newDoc = function () {
    $scope.doc = new Doc();
  };
  $scope.checkNewLines = function() {
    DocService.newLineCount($scope.doc.content);
  };
  $scope.newLines = function(event) {
    if (event.which === 13) {
      DocService.checkKey($scope.doc.content,'enter');
    } else if (event.which === 8) {
      DocService.checkKey($scope.doc.content,'backspace');
    }
    var ta = document.getElementById('content');
    var lineObj = document.getElementById('lineObj');
    ta.onkeydown = function() { positionLineObj(lineObj,ta); };
    ta.onmousedown = function() { positionLineObj(lineObj,ta); };
    ta.onscroll = function() { positionLineObj(lineObj,ta); };
    var positionLineObj = function(obj,ta) {
      obj.style.top = (ta.scrollTop * -1 + 2) + 'px';
    }
  };
}]);
