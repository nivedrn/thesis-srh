#!/bin/sh
set -eu

# We do this first to ensure sudo works below when renaming the user.
# Otherwise the current container UID may not exist in the passwd database.
eval "$(fixuid -q)"

if [ "${DOCKER_USER-}" ]; then
  USER="$DOCKER_USER"
  if [ "$DOCKER_USER" != "$(whoami)" ]; then
    echo "$DOCKER_USER ALL=(ALL) NOPASSWD:ALL" | sudo tee -a /etc/sudoers.d/nopasswd > /dev/null
    # Unfortunately we cannot change $HOME as we cannot move any bind mounts
    # nor can we bind mount $HOME into a new home as that requires a privileged container.
    sudo usermod --login "$DOCKER_USER" coder
    sudo groupmod -n "$DOCKER_USER" coder
    
    sudo sed -i "/coder/d" /etc/sudoers.d/nopasswd
  fi
fi

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

    # ${CSINST} /tmp/cohesion-0.0.1.vsix
    # sudo rm -f /tmp/cohesion-0.0.1.vsix
fi
  
if [ "$FIRSTINIT" ]; then
    if [ ! -e $HOME/workspace/ ]; then
        mkdir $HOME/workspace
        cd workspace
    fi
    chown -R coder:coder $HOME
     ssh-keygen -t rsa -b 4096 -f /home/coder/.ssh/id_rsa -q -N ""

    # Set permissions
    chmod 600 /home/coder/.ssh/id_rsa
    chmod 700 /home/coder/.ssh
    chown coder:coder /home/coder/.ssh

    # Add public key to authorized_keys
    echo "Your public key is located at /home/coder/.ssh/id_rsa.pub"
    cat /home/coder/.ssh/id_rsa.pub >> /home/coder/.ssh/authorized_keys
    
    sudo chmod 600 /etc/ssh/ssh_host_*_key
    sudo chown coder:coder /etc/ssh/ssh_host_*_key

    sudo chown coder:coder /run/
fi

exec dumb-init /usr/bin/code-server --bind-addr 0.0.0.0:8080 . &
/usr/sbin/sshd -D -e