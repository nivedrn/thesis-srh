#!/bin/sh
set -eu

CSINST="code-server --install-extension"
APTINST="sudo apt-get update && apt-get install -y "
FIRSTINIT=false

if [ -s /tmp/cohesion-0.0.1.vsix ]; then
    # first time setup
    FIRSTINIT=true

    # ${CSINST} formulahendry.code-runner --force
    # ${CSINST} pkief.material-icon-theme --force
    # ${CSINST} adamraichu.zip-viewer --force
    # ${CSINST} phil294.git-log--graph --force
    # ${CSINST} anwar.papyrus-pdf --force
    # ${CSINST} tomoyukim.vscode-mermaid-editor --force

    ${CSINST} /tmp/cohesion-0.0.1.vsix
    sudo rm -f /tmp/cohesion-0.0.1.vsix
fi
  
if [ "$FIRSTINIT" ]; then
    if [ ! -e $HOME/workspace/ ]; then
        mkdir $HOME/workspace
        cd workspace
    fi
    chown -R coder:coder $HOME
fi

/usr/bin/code-server --bind-addr 0.0.0.0:8080 . &
/usr/sbin/sshd -D -e