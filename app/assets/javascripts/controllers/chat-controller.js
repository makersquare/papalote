app.controller('ChatController', ['$scope', '$routeParams', 'ChatService',
  function($scope, $routeParams, ChatService) {
    ChatService.resetMessages();
    $scope.messages = ChatService.messages;
    $scope.id = $routeParams.id;
    $scope.glued = true;

    $scope.sendMessage = function(data) {
      data.room = $routeParams.id;
      ChatService.sendMessage(data);
      $scope.message = {message: ""};
      return false;
    };

    ChatService.setSocketListener($scope.id);
}]);
