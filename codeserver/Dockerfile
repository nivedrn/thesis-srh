FROM debian:bookworm

ENV PASSWORD="secret123"
ENV SUDO_PASSWORD=$PASSWORD
ENV SHELL="/bin/bash"
ENV CODER_UID=1000
ENV CODER_GID=1000

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
    sed -i 's/^#\(PermitRootLogin\) .*/\1 yes/' /etc/ssh/sshd_config; \
    sed -i 's/^#\(PasswordAuthentication\) .*/\1 yes/' /etc/ssh/sshd_config; \
    sed -i 's/^\(UsePAM yes\)/# \1/' /etc/ssh/sshd_config; \
    apt clean;

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
ADD code-server_4.90.3_amd64.deb /tmp
RUN dpkg -i /tmp/code-server*$(dpkg --print-architecture).deb

RUN sudo chmod 600 /etc/ssh/ssh_host_*_key \
    && sudo chown root:root /etc/ssh/ssh_host_*_key \
    && sudo chmod 755 /run

EXPOSE 8080    
EXPOSE 22
USER 1000
ENV USER=coder

RUN mkdir /home/coder/workspace
WORKDIR /home/coder/workspace

ENTRYPOINT ["entrypoint.sh"]