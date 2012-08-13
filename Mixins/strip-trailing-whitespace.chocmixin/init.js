/*!
 * Strip Trailing Whitespace mixin for Chocolat
 * Copyright(c) 2012 Nicholas Penree <nick@penree.com>
 * MIT Licensed
 */

/**
 * Hook up menu items.
 */


process.on('uncaughtException', function(err) {
  Alert.show('Javascript Exception', err.message, ['Dammit.']);
});


try {
Hooks.addMenuItem('Text/Lines/Strip Trailing Whitespace', 'control-shift-w', function() {
   console.log(bar);
  Recipe.run(function(recipe) {
    var sel = (!recipe.selection.length)? new Range(0, recipe.length) : recipe.selection;
    recipe.eachLine(sel, function(marker) {
      return marker.text.trimRight();
    });
  });
});
} catch (e) {
  Alert.show('Javascript Exception', e.message, ['Dammit.']);

}