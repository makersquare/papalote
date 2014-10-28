app.controller('ChatController', ['$scope', '$timeout', 'ChatService',
  function($scope, $timeout, ChatService) {
    $scope.messages = ChatService.messages;

    $scope.sendMessage = function(data) {
      ChatService.sendMessage(data);
      $scope.message = {message: ""};
      return false;
    };

    ChatService.setSocketListener();
}]);
