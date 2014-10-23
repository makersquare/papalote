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
    },
    newLineCount: function(str,event) {
      if (event === 'enter') {
        this.lineNumber += 1;
      } else {
        this.lineNumber = str.split('\n').length;
      }
      var string = '';
      for (var i = 1;i <= this.lineNumber;i++) {
        string += i + '<br>';
      }
      document.getElementById('lineObj').innerHTML = string;
    }
  }
}]);
