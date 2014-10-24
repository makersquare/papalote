<<<<<<< HEAD
app.factory('Folder', ['$resource', '$location', 'DocService',
  function($resource, $location, DocService) {
=======
app.factory('Folder', ['$resource', '$location', 'DocService', 'FolderDocs',
  function($resource, $location, DocService, FolderDocs) {
>>>>>>> refactor to remove logic and dependenices from controller, place in model.
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
