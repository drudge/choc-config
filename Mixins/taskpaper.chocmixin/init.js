// Taskpaper toggle complete
Hooks.addKeyboardShortcut("cmd-d", function() {
  var doc = Document.current();
  
  if (doc.rootScope() !== 'plain.tasks.text') {
    Alert.beep();
    return;
  }
  
  Recipe.run(function(recipe) {
    var sel = recipe.selection;
    if (!sel.length) {
      sel = recipe.contentRangeOfLinesInRange(sel);
    };
    
    recipe.eachLine(sel, function(marker) {
      if (/^(\s*-.*)(\({1}@done.*\){1}|[^\(]@done.*).*$/.test(marker.text) === false) {
        return marker.text.replace(/^(.*)$/, "$1 @done");
      } else if(/^\s+?-.*$/.test(marker.text)) {
        return marker.text.replace(/^(\s*-.*)(\({1}@done.*\){1}|[^\(]@done.*).*$/, "$1");
      } else {
        return undefined;
      }
    });
  });
});
