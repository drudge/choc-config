#!/bin/sh

REPO="https://github.com/drudge/choc-config.git"
CHOCOLAT_APP="/Applications/Chocolat.app"
APP_SUPPORT="$HOME/Library/Application Support/Chocolat"

echo ''
echo "  drudge's tasty"
echo '     ______ __                         __        __ '
echo '    / ____// /_   ____   _____ ____   / /____ _ / /_'
echo '   / /    / __ \ / __ \ / ___// __ \ / // __ `// __/'
echo '  / /___ / / / // /_/ // /__ / /_/ // // /_/ // /_ '
echo '  \____//_/ /_/ \____/ \___/ \____//_/ \__,_/ \__/'
echo '                                      config'
echo ''

if [ -e "$APP_SUPPORT" ]; then
  read -p "$APP_SUPPORT exists, do you want to overwrite? (y/N) " -n 1 ANSWER
  if [[ $ANSWER =~ ^[Yy]$ ]];then
     rm -Rf "$APP_SUPPORT"
  else
    echo ""
    echo "Aborted bootstrap of $APP_SUPPORT since it already exists."
    exit 1
  fi
fi

echo ''
echo "Cloning configuration..."

git clone $REPO "$APP_SUPPORT" --recursive --quiet

source "$APP_SUPPORT/update-links.sh"
source "$APP_SUPPORT/set-prefs.sh"