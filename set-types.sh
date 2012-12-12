#!/bin/sh

################################################################################
source "$HOME/Library/Application Support/Chocolat/Custom/default_app.sh"

echo "Setting Chocolat as the default app for various types..."

################################################################################
## Add file types or UTIs below
################################################################################

use "extension" "js"
use "uti" "com.netscape.javascript-source"
use "extension" "coffee"
use "extension" "iced"

use "extension" "Jakefile"
use "extension" "Rakefile"
use "extension" "Procfile"

use "uti" "net.daringfireball.markdown"
use "extension" "md"
use "extension" "markdown"

use "uti" "public.xml"
use "uti" "public.php-script"
use "uti" "public.perl-script"
use "uti" "public.ruby-script"
use "uti" "public.json"

use "extension" "css"
use "extension" "less"
use "extension" "scss"
use "extension" "styl"