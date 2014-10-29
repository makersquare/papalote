app.factory('Doc', ['$resource', function($resource) {
  return $resource('/docs/:id',
    {id: '@id'},
    {update: {method: "PATCH"}}
  );
}]);