app.controller('ChatController', ['$scope', '$timeout',
  function($scope, $timeout) {

    $scope.messages = [];

    $scope.sendMessage = function(data) {
      socket.emit('chat message', data.message);
      // $scope.messages.push({message: data.message, username: 'Jeff'});
      $scope.message.message = "";
      return false;
    }

    socket.on('chat message', function(msg) {
      $scope.messages.push({message: msg, username: "Jeff 2"});
    })


}]);
