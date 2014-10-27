app.factory('Download', ['$resource', function($resource){
  return $resource('/docs/:id/download');
}]);