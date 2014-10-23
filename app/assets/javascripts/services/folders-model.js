app.factory('Folder', ['$resource', '$location',
  function($resource, $location) {
    var Fldr = $resource(
      '/folders/:id',
      {id: '@id'},
      {update: {method: "PATCH"}}
    );
  return {
    folderResource: Fldr,
    createFolder: function(name) {
      var newFolder = new Fldr({name: name})
      newFolder.$save(function(data) {
        $location.path("/folder/" + data.id);
      });
    }
  }
}]);
