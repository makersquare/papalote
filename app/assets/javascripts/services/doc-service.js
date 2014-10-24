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
		},
		checkKey: function(str,event) {
		  if (event === 'enter' || event === 'backspace') {
				this.lineNumber = str.split("\n");
		  }
		},
		scrollLineNumber: function() {
			var textarea = document.getElementById('content');
	    var lineObj = document.getElementById('lineObj');
	    textarea.onkeydown = function() { positionLineObj(lineObj,textarea); };
	    textarea.onmousedown = function() { positionLineObj(lineObj,textarea); };
	    textarea.onscroll = function() { positionLineObj(lineObj,textarea); };
	    var positionLineObj = function(obj,textarea) {
	      obj.style.top = (textarea.scrollTop * -1 + 2) + 'px';
	    }
		}
  }
}]);
