ARG BASE=debian:bookworm

FROM scratch AS packages
COPY ./code-server*.deb /tmp/

FROM $BASE

ENV PASSWORD="secret123"
ENV SUDO_PASSWORD=$PASSWORD
ENV SHELL="/bin/bash"
ENV CODER_UID=1000
ENV CODER_GID=1000

RUN apt-get update \
  && apt-get install -y \
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
    systemctl \
    iproute2 \
  && git lfs install \
  && rm -rf /var/lib/apt/lists/*

# https://wiki.debian.org/Locale#Manually
RUN sed -i "s/# en_US.UTF-8/en_US.UTF-8/" /etc/locale.gen \
  && locale-gen
ENV LANG=en_US.UTF-8

RUN adduser --gecos '' --disabled-password coder \
    && echo "coder:$SUDO_PASSWORD" | chpasswd \
  && echo "coder ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/nopasswd

RUN ARCH="$(dpkg --print-architecture)" \
  && curl -fsSL "https://github.com/boxboat/fixuid/releases/download/v0.6.0/fixuid-0.6.0-linux-$ARCH.tar.gz" | tar -C /usr/local/bin -xzf - \
  && chown root:root /usr/local/bin/fixuid \
  && chmod 4755 /usr/local/bin/fixuid \
  && mkdir -p /etc/fixuid \
  && printf "user: coder\ngroup: coder\n" > /etc/fixuid/config.yml

ADD cohesion-0.0.1.vsix /tmp
COPY ./entrypoint.sh /usr/bin/entrypoint.sh
RUN --mount=from=packages,src=/tmp,dst=/tmp/packages dpkg -i /tmp/packages/code-server*$(dpkg --print-architecture).deb

RUN mkdir /var/run/sshd; \
  apt install -y openssh-server; \
  sed -i 's/^#\(PermitRootLogin\) .*/\1 yes/' /etc/ssh/sshd_config; \
  sed -i 's/^\(UsePAM yes\)/# \1/' /etc/ssh/sshd_config; \
  apt clean; 

EXPOSE 8080
EXPOSE 22
USER 1000
ENV USER=coder

RUN mkdir /home/coder/workspace
WORKDIR /home/coder/workspace
ENTRYPOINT ["/usr/bin/entrypoint.sh", "--bind-addr", "0.0.0.0:8080", "."]
