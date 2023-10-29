FROM python:3.9.18-alpine3.18

RUN apk update -f \
    && apk upgrade \
    && apk --no-cache add -f \
    git \
    python3-dev \
    build-base \
    cmake \
    libffi-dev \
    openssl-dev
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && git clone https://github.com/HT944/QRabbitPro.git /Rabbit \
    && cd /Rabbit \
    && pip3 install --no-cache-dir -r requirements.txt \
    && rm -rf /var/cache/apk/*

WORKDIR /Rabbit

CMD python3 Rabbit.py
