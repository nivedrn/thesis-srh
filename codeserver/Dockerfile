FROM debian:bookworm

ENV SHELL="/bin/bash"
ENV CODER_UID=1000
ENV CODER_GID=1000
ENV SUDO_PASSWORD="secret123"
ENV HOME="/home/coder"

# timezone
RUN apt update && apt install -y \
    iproute2 \
    tzdata \
    curl \
    dumb-init \
    git \
    git-lfs \
    htop \
    locales \
    lsb-release \
    man-db \
    nano \
    procps \
    sudo \
    vim-tiny \
    wget \
    zsh \
    iputils-ping \
    && git lfs install; \
    apt clean;

RUN mkdir /var/run/sshd; \
    apt install -y openssh-server; \
    sed -i 's/^#\(UsePAM yes\)/UsePAM yes/' /etc/ssh/sshd_config; \
    sed -i 's/^#\(PermitRootLogin\) .*/\1 no/' /etc/ssh/sshd_config; \
    apt clean;

RUN addgroup --gid $CODER_GID coder && \
    adduser --disabled-login --gecos "" --shell $SHELL --home $HOME --uid $CODER_UID --ingroup coder coder && \
    echo "coder ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/nopasswd && \
    sed -i "/^# %sudo/s/^# //" /etc/sudoers && \
    echo "coder:$SUDO_PASSWORD" | chpasswd && \
    sudo chown coder:coder /etc/ssh/ssh_host_*_key && \
    sudo chown coder:coder /run/

ADD cohesion-0.0.1.vsix /tmp/cohesion-0.0.1.vsix
ADD codeserver-setup.sh /codeserver-setup.sh
RUN chmod +x /codeserver-setup.sh
ADD code-server_4.90.3_amd64.deb /tmp
RUN dpkg -i /tmp/code-server*$(dpkg --print-architecture).deb

# ready for deployment
EXPOSE 8080
EXPOSE 22
USER coder

VOLUME [ "$HOME" ]
ENTRYPOINT [ "/codeserver-setup.sh" ]

