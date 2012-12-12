#!/bin/sh

PLIST="$HOME/Library/Preferences/com.apple.LaunchServices.plist"
BUDDY=/usr/libexec/PlistBuddy
CHOC_APP=com.chocolatapp.chocolat

function _create {
  if [ $KEY = 'LSHandlerContentType' ]; then
    $BUDDY -c "Add LSHandlers:$I dict" $PLIST
    $BUDDY -c "Add LSHandlers:$I:$KEY string $VALUE" $PLIST
    $BUDDY -c "Add LSHandlers:$I:LSHandlerRoleAll string $CHOC_APP" $PLIST
  elif [ $KEY = 'LSHandlerContentTag' ]; then
    $BUDDY -c "Add LSHandlers:$I dict" $PLIST
    $BUDDY -c "Add LSHandlers:$I:$KEY string $VALUE" $PLIST
    $BUDDY -c "Add LSHandlers:$I:LSHandlerContentTagClass string public.filename-exension" $PLIST
    $BUDDY -c "Add LSHandlers:$I:LSHandlerRoleAll string $CHOC_APP" $PLIST
  else
    echo "Unknown type $KEY, ignoring"
  fi
}

function use() {
  declare -i I=0
  while [ true ] ; do
    KEY="UNKNOWN"
    VALUE=$2
    
    if [ $1 = "extension" ]; then
      KEY="LSHandlerContentTag"
    elif [ $1 = "uti" ]; then
      KEY="LSHandlerContentType"
    fi
    
    $BUDDY -c "Print LSHandlers:$I" $PLIST >/dev/null 2>&1
    [[ $? -eq 0 ]] || { echo "   $VALUE $1 not found, setting it to $CHOC_APP" ; _create; return ; }
    
    OUT="$( $BUDDY -c "Print 'LSHandlers:$I:$KEY'" $PLIST 2>/dev/null )"
    if [[ $? -ne 0 ]] ; then 
      I=$I+1
      continue
    fi
    
    CONTENT=$( echo "$OUT" )
    if [[ $CONTENT = $VALUE ]] ; then
      echo "    Replacing $CONTENT $1 handler with $CHOC_APP"
      $BUDDY -c "Delete 'LSHandlers:$I'" $PLIST
      _create
      return
    else
      I=$I+1 
    fi
  done
}