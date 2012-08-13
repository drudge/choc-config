/*!
 * Github Flavored Markdown mixin for Chocolat
 * Copyright(c) 2012 Nicholas Penree <nick@penree.com>
 * MIT Licensed
 */
 
/**
 * Module dependencies.
 */

var ghm = require("github-flavored-markdown")

//TODO: This seems to create a duplicate Markdown menu item. The first time it adds the 
//      item to the new menu, all subsequent reloads put it under the existing one.
Hooks.addMenuItem('Actions/Markdown/Preview Github Flavored Markdown', 'cmd-alt-p', function() {
  var doc = Document.current()
    , win = new Window()
    , html = "";
    
  if (doc.rootScope() !== 'html.markdown.text') {
    Alert.beep();
    return;
  }
  
  win.title = doc.displayName();
  win.htmlPath = "preview.html";
  win.run();
  
  html = ghm.parse(doc.text);
  
  if (html) {
    win.applyFunction(function (data) { 
      document.body.innerHTML = data;
    }, [html]);
  }
  
  //TODO: I rather set a size, this doesn't seem to work
  win.setFrame({x: 0, y: 0, width: 750, height: 750}, true);
  win.center();
});