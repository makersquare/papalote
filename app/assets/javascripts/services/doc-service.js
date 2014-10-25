app.factory('DocService', ['$location', 'Doc', function($location, Doc) {
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
    }
  }
}]);
