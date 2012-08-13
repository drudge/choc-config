/*!
 * Transmit 4 mixin for Chocolat
 * Copyright(c) 2012 Nicholas Penree <nick@penree.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var spawn = require('child_process').spawn;

/**
 * Hook up menu items.
 */

Hooks.addMenuItem('Actions/Transmit/Send File With Active Connection', 'control-shift-f', function() {
  var filePath = Document.current().path()
    , script = 'tell application "Transmit"\n' +
               '  tell current tab of front document\n' +
               '    tell remote browser\n' +
               '      upload item at path "' + filePath + '"\n' +
               '    end tell\n' +
               '  end tell\n' +
               'end tell\n';

  // Make sure we have a file to send
  if (!filePath) {
    Alert.beep();
    Alert.show('Could not Send File', 'Please make sure you have saved the file before you attempt to send it.', [ 'OK' ]);
    return;
  }    

  var osa = spawn('/usr/bin/osascript', [ '-e', script ]);      
});

Hooks.addMenuItem('Actions/Transmit/Send Document (DockSend)', 'control-shift-f', function() {
  var filePath = Document.current().path()
    , script = 'set filename to POSIX file "' + filePath + '"\n' +
               'ignoring application responses\n' +
               '  tell application "Transmit"\n' +
               '    open filename\n' +
               '  end tell\n' +
               'end ignoring';

  // Make sure we have a file to send
  if (!filePath) {
    Alert.beep();
    Alert.show('Could not Send Document', 'Please make sure you have saved the document before you attempt to send it.', [ 'OK' ]);
    return;
  }    
  
  var osa = spawn('/usr/bin/osascript', [ '-e', script ]);
});