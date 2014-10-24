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
		newLineCount: function(str) {
		  this.lineNumber = str.split('\n').length;
		  this.addLineNumber();
		},
		addLineNumber: function() {
		  var string = '';
		  for (var i = 1;i <= this.lineNumber;i++) {
				string += '<div>' + i + '</div>';
		  }
		  document.getElementById('lineObj').innerHTML = string;
		}
  }
}]);
