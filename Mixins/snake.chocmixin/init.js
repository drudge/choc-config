Hooks.addMenuItem('Window/Snake!', '', function() {
 var win = new Window();
 
 win.title = 'Snake!';
 win.useDefaultCSS = false;
 win.htmlPath = 'index.html';
 win.buttons = [ 'Close',  ];
 win.onButtonClick = function(title) {
  win.close();
 };  
 
 win.run(); 
});