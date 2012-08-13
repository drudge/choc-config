var Gister = require('gister')
  , keychain = require('keychain');

/**
 * Hook up menu items.
 */

Hooks.addMenuItem('Actions/Gist/Public Gist Current Document', 'control-shift-g', function() {
  keychain.getPassword({ account: 'drudge', service: 'Chocolat Gist Plugin' }, function(err, pass) {
    if (!pass) {
      showLoginWindow();
      return;
    }
    
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
  });
  
  showLoginWindow();
});

function saveCredentials(user) {
  Alert.show('Thing', 'other thing', ['OK']);
}

function showLoginWindow() {
  var win = new Window();
  
  win.title = 'Login to Gist';
  win.useDefaultCSS = false;
  win.htmlPath = 'login.html';
  win.buttons = [ 'Login', 'Cancel' ];
  win.setFrame({x: 0, y: 0, width: 259, height: 211}, true);
  win.onButtonClick = function(title) {
    if (title == 'Cancel') {
      win.close();
      return;
    }
    
    win.applyFunction(function() {
      var un = document.getElementById("username").value;
      var pw = document.getElementById("password").value;
      chocolat.applyFunction("saveCredentials", [un, pw]);
    }, []);
  };
  win.onLoad = function() {
    win.applyFunction(function (data) {
      document.getElementById('username').focus();
    }, []);
  };
  
  win.run();
}