app.factory('DocService', ['$location', 'Doc', '$http', function($location, Doc, $http) {
  return {
    lineNumber: 0,
    newDocSave: function(doc) {
      Doc.save(doc, function(data) {
        $location.path('/docs/' + data.id);
      });
    },
    updateDoc: function(doc) {
      Doc.update(doc);
    },
    newDoc: function() {
      $location.path('/docs/new');
    },
    createTempFile: function(id) {
      $http.get('/docs/' + id + '/createDocFile').
      success(function(){
        $http.get('/docs/' + id + '/deleteDocFile')
      });
    }
  };
}]);
