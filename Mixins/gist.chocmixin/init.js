var Gister = require('gister')
  , keychain = require('keychain');

Hooks.addMenuItem('Actions/Gist/Public Gist Current Document', 'control-shift-g', function() {
  /*keychain.getPassword({ account: 'drudge', service: 'Chocolat Gist Plugin' }, function(err, pass) {
    var gist = new Gister({username: 'drudge', password: pass});
    var doc = Document.current()
      , file = doc.filename()
      , payload = {};
    
    file = file || 'untitled';
    payload[file] = doc.text;
    
    gist.create(payload);
    
    gist.on('created', function (d) {
      d = d || {};
      url = d.html_url;
      
      if (url) {
        Alert.show('Gist created', url, [ 'OK']);
        Clipboard.copy(url);
      }      
    });
  });*/
  
  showLoginWindow();
});


function showLoginWindow() {
 var loginWindow = new Window();

 loginWindow.title = 'Login to Gist';
 loginWindow.useDefaultCSS = false;
 loginWindow.htmlPath = 'login.html';
 loginWindow.buttons = [ 'Login', 'Cancel' ];
 loginWindow.onButtonClick = function(title) {
   if (title == 'Cancel') {
     loginWindow.close();
     return;
   }

   return;
 };  

 loginWindow.run(); 
}