app.factory('Folder', ['$resource', 
  function($resource) {
    return $resource(
      '/folders/:id',
      {id: '@id'},
      {update: {method: "PATCH"}}
    );
}])