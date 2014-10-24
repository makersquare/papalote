app.controller('ChatController', ['$scope', '$timeout', 'socket',
  function($scope, $timeout, socket) {

    $scope.messages = [];

    $scope.sendMessage = function(data) {
      socket.emit('chat message', data.message);
      $scope.message.message = "";
      return false;
    }

    socket.on('chat message', function(msg) {
      $scope.messages.push({message: msg, username: "Jeff 2"});
    })
}]);
