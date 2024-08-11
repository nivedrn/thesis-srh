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

    ${CSINST} /tmp/cohesion-${COHESION_VERSION}.vsix
    sudo rm -f /tmp/cohesion-${COHESION_VERSION}.vsix
fi
  
if [ "$FIRSTINIT" ]; then
    if [ ! -e $HOME/workspace/ ]; then
        mkdir $HOME/workspace
        cd workspace
    fi
    chown -R coder:coder $HOME
fi

exec dumb-init /usr/bin/code-server --bind-addr 0.0.0.0:8080 . &
/usr/sbin/sshd -D -e