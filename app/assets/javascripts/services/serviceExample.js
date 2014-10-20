app.factory('AppRsc', ['$resource', function($resource){
  return {
    shout: function(){
      console.log("I am a resource");
    },
    shoutTwo: function(){
      console.log("I am a resource AGAIN!");
    },
    error: "Error! Oh No!"
  };
}]);