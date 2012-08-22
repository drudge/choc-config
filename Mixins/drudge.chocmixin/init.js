/**
 * Override keyboard shortcuts.
 */
 
// "Fix" Go To file...
Hooks.setShortcutForMenuItem("Go/Go to File…", "cmd-t"); //…
Hooks.setShortcutForMenuItem("File/New Workspace", "cmd-option-t"); //…

// "Fix" command-n
Hooks.setShortcutForMenuItem("File/New Window", "cmd-n");
Hooks.setShortcutForMenuItem("File/New File", "cmd-shift-n");
