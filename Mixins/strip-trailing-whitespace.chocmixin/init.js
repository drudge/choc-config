/*!
 * Strip Trailing Whitespace mixin for Chocolat
 * Copyright(c) 2012 Nicholas Penree <nick@penree.com>
 * MIT Licensed
 */

/**
 * Hook up menu items.
 */

Hooks.addMenuItem('Text/Lines/Strip Trailing Whitespace', 'control-shift-w', function() {
  Recipe.run(function(recipe) {
    var sel = (!recipe.selection.length)? new Range(0, recipe.length) : recipe.selection;
    recipe.eachLine(sel, function(marker) {
      return marker.text.trimRight();
    });
  });
});