app.factory('DocService', ['$location', 'Doc', 'User', '$http',
  function($location, Doc, User, $http) {
  return {
    lineNumber: 0,
    newDocSave: function(doc) {
      doc.owner_id = User.currentUser.id
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
