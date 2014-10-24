app.controller('DocController', ['$scope','Doc', '$timeout', '$route','DocService',
  function($scope, Doc, $timeout, $route, DocService) {
  $scope.doc = Doc.get({id: $route.current.params.id}, function(data) {
    DocService.newLineCount(data.content);
    if (DocService.lineNumber > 20) {
      $scope.lineNumber = DocService.lineNumber;
    } else {
      $scope.lineNumber = 20;
    }
  });
  $scope.titleEditDisable = true;
  $scope.saveComplete = false;
  $scope.saveDoc = function(doc) {
    DocService.updateDoc(doc);
    $scope.saveComplete = true;
    $timeout(function() {
      $scope.saveComplete = false;
    }, 5000);
  };
  $scope.newDoc = function () {
    DocService.newDoc();
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
