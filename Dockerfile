FROM python:3.9-slim-buster

RUN apt update \
    && apt-get install -yq --no-install-recommends \
    sudo \
    python3-dev \
    gcc \
    libc-dev \
    git \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && git clone https://github.com/HT944/QRabbitPro.git /Rabbit \
    && cd /Rabbit \
    && pip3 install --no-cache-dir -r requirements.txt \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /Rabbit

CMD python3 Rabbit.py
