#!/bin/sh

REPO="https://github.com/drudge/choc-config.git"
CHOCOLAT_APP="/Applications/Chocolat.app"
APP_SUPPORT="$HOME/Library/Application Support/Chocolat"
PREF_DOMAIN="com.chocolatapp.Chocolat"

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

source update-links.sh

echo "Setting up preferences..."

defaults write $PREF_DOMAIN "CHActiveTheme" -string "Sidetracked Edge"
defaults write $PREF_DOMAIN "CHDefaultFont" -string "Menlo-Regular"
defaults write $PREF_DOMAIN "CHDefaultFontSize" -float 13.0
defaults write $PREF_DOMAIN "CHLineSpacing" -float 1.3

defaults write $PREF_DOMAIN "CHHighlightCurrentLine" -bool YES
defaults write $PREF_DOMAIN "CHHighlightIdenticalWords" -bool YES
defaults write $PREF_DOMAIN "CHShowInvisibles" -bool YES

defaults write $PREF_DOMAIN "Choosing Directories in Open Panel" -bool YES
defaults write $PREF_DOMAIN "Folders on Top" -bool YES
defaults write $PREF_DOMAIN "Hidden Filenames" -string ".DS_Store,dump.rdb"
defaults write $PREF_DOMAIN "CHProjectFindIgnoreDirectories" -string "node_modules,.git,tmp,log"

defaults write $PREF_DOMAIN "Ignore Empty Matches" -bool YES
defaults write $PREF_DOMAIN "^ and $ Match Line Boundaries" -bool YES
defaults write $PREF_DOMAIN "Dot Matches Newlines" -bool NO
defaults write $PREF_DOMAIN "Capture Numbered Groups" -bool YES
defaults write $PREF_DOMAIN "XBFF Syntax Type" -string "Ruby (default)"

#defaults write $PREF_DOMAIN "NSQuitAlwaysKeepsWindows" -bool YES
defaults write $PREF_DOMAIN "CHSaveOnDefocus" -bool NO
defaults write $PREF_DOMAIN "CHTrimTrailingWhitespaceAmount" -int 1