app.factory('Folder', ['$resource', '$location',
  function($resource, $location) {
    var folderResource = $resource(
      '/folders/:id',
      {id: '@id'},
      {update: {method: "PATCH"}}
    );
  return {
    folderResource: folderResource,
    createFolder: function(name) {
      var newFolder = new folderResource({name: name});
      newFolder.$save(function(data) {
        $location.path("/folders/" + data.id);
      });
    }
  };
}]);
