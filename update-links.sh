#!/bin/sh

CHOCOLAT_APP="/Applications/Chocolat.app"
APP_SUPPORT="$HOME/Library/Application Support/Chocolat"

echo "Linking completions..."

#rm "$CHOCOLAT_APP/Contents/Resources/completions.json"
#ln -s "$APP_SUPPORT/completions.json" "$CHOCOLAT_APP/Contents/Resources/completions.json"

echo "Linking templates..."

rm "$CHOCOLAT_APP/Contents/Resources/boilerplate.json"
ln -s "$APP_SUPPORT/boilerplate.json" "$CHOCOLAT_APP/Contents/Resources/boilerplate.json"

#echo "Removing built-in JavaScript truffle..."

#rm -rf "$CHOCOLAT_APP/Contents/SharedSupport/Truffles/javascript.truffle"
