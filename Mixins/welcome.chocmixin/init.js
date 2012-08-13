/*!
 * Welcome mixin for Chocolat
 * Copyright(c) 2012 Nicholas Penree <nick@penree.com>
 * MIT Licensed
 */
function showWelcomeWindow() {
  var welcomeWindow = new Window();

  welcomeWindow.title = 'Welcome to Chocolat!';
  welcomeWindow.useDefaultCSS = false;
  welcomeWindow.htmlPath = 'welcome.html';
  welcomeWindow.buttons = [ 'Close' ];
  welcomeWindow.setFrame({ x:0, y:0, height: 472, width: 634 });
  welcomeWindow.onButtonClick = function(title) {
    welcomeWindow.close();
  };
  
  welcomeWindow.run();
  welcomeWindow.center();
}

setTimeout(showWelcomeWindow, 1000);