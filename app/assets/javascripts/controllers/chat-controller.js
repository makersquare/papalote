app.controller('ChatController', ['$scope', '$timeout', 'ChatService',
  function($scope, $timeout, ChatService) {
    // $scope.messages = ChatService.messages;
    // $scope.emojis = [
    //     "Animals: :dog: :cat: :snake:",
    //     "People: :smile: :confused: :angry:",
    //     "Places: :house: :school: :hotel:"
    // ];

 $scope.message = "String including Emoji codes :smiley:";

    // $scope.sendMessage = function(data) {
    //   ChatService.sendMessage(data);
    //   $scope.message = {message: ""};
    //   return false;
    // };

    ChatService.setSocketListener();
}]);
