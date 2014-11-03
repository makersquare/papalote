app.factory('Delete', ['$resource', function($resource){
  return $resource('/docs/:id/delete');
}]);
