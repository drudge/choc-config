// Taskpaper toggle complete
Hooks.addKeyboardShortcut("cmd-d", function() {
  var doc = Document.current();
  
  if (doc.rootScope() !== 'plain.tasks.text') {
    Alert.beep();
    return;
  }
  
  Recipe.run(function(recipe) {
    if (!recipe.selection.length) return;
    
    recipe.eachLine(recipe.selection, function(marker) {
      if (/^(\s*-.*)(\({1}@done.*\){1}|[^\(]@done.*).*$/.test(marker.text.replace('\n', '')) === false) {
        return marker.text.replace(/^(.*)$/, "$1 @done");
      } else {
        return marker.text.replace(/^(\s*-.*)(\({1}@done.*\){1}|[^\(]@done.*).*$/, "$1");
      }
    });
  });
});
