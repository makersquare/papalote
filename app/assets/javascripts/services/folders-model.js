app.factory('Folder', ['$resource', '$location', 'DocService',
  function($resource, $location, DocService) {
    var folderResource = $resource(
      '/folders/:id',
      {id: '@id'},
      {update: {method: "PATCH"}}
    );

    var folderDocResource = $resource(
      '/folders/:folder_id/contents',
      {folder_id: '@folder_id'},
      {update: {method: "PATCH"}}
    );

  return {
    folderDocResource: folderDocResource,
    folderResource: folderResource,
    createFolder: function(folder) {
      var newFolder = new folderResource(folder);
      newFolder.$save(function(data) {
        $location.path("/folders/" + data.id);
      });
    },
    createDocForFolder: function(doc) {
      DocService.newDocSave(doc);
    },
    createDocOrFolder: function(info){
      if (info.name.indexOf('.')!== -1) {
        DocService.newDocSave({name: info.name, folder_id: info.folder.id});
      }
      else {
        this.createFolder({name: info.name, parentfolder_id: info.folder.id});
      }
    }
  };
}]);
