FROM python:3.9-slim-buster
WORKDIR /
RUN apt update && apt-get install -yq --no-install-recommends sudo gcc python3-dev libc-dev git && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" >> /etc/timezone && git clone https://github.com/HT944/QRabbit.git Rabbit && cd Rabbit && pip3 install -r requirements.txt 
WORKDIR /Rabbit
CMD sudo python3 Rabbit.py
