/**
 * Module dependencies.
 */

var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

/**
 * Override keyboard shortcuts.
 */

// "Fix" Go To file...
Hooks.setShortcutForMenuItem("Go/Go to File…", "cmd-t"); //…
Hooks.setShortcutForMenuItem("File/New Workspace", "cmd-option-t"); //…

// "Fix" command-n
Hooks.setShortcutForMenuItem("File/New Window", "cmd-n");
Hooks.setShortcutForMenuItem("File/New File", "cmd-shift-n");

Hooks.addMenuItem('Actions/Chocolat/Open App Support Folder…', '', function() {
  exec('open "' + path.join(process.env.HOME, "Library", "Application Support", "Chocolat") + '"');
});