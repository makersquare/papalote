app.factory('FolderDocs', ['$resource', function($resource) {
  return $resource('/folders/:folder_id/docs',
    {folder_id: '@folder_id'},
    {update: {method: "PATCH"}}
  );
}]);

