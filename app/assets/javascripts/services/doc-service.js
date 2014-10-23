app.factory('DocService', ['$location', 'Doc', function($location, Doc) {
  return {
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
    newLineCount: function(str) {
      var lines = str.split('\n').length;
      var string = '';
      for (var i = 1;i <= lines;i++) {
        string += i + '<br>';
      }
      document.getElementById('lineObj').innerHTML = string;
    }
  }
}]);
