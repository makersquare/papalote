app.factory('Folder', ['$resource', '$location', 'DocService', 'FolderDocs',
  function($resource, $location, DocService, FolderDocs) {
    var folderResource = $resource(
      '/folders/:id',
      {id: '@id'},
      {update: {method: "PATCH"}}
    );

    var folderDocResource = $resource(
      '/folders/:folder_id/docs',
      {folder_id: '@folder_id'},
      {update: {method: "PATCH"}}
    );

  return {
    folderDocResource: folderDocResource,
    folderResource: folderResource,
    createFolder: function(name) {
      var newFolder = new folderResource({name: name});
      newFolder.$save(function(data) {
        $location.path("/folders/" + data.id);
      });
    },
    createDocForFolder: function(doc) {
      DocService.newDocSave(doc);
    }
  };
}]);
