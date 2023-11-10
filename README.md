# **RabbitPro**

## 功能介绍
> * 自动获取ck
> * 管理ck
> > 1. 车头模式：登陆时，用户选择容器；同步时，根据ck权重，重新进行容器内的ck排序  
> > 2. 传统模式：登陆时，用户选择容器；同步时，仅更新或添加ck进对应容器  
> > 3. 分配模式：登录时，随机分配容器，同步时，重新分配ck，容器权重越大，分到的ck越多；ck权重越大，排序越靠前  
> > 4. 随机容器：登录时，随机分配容器，同步时，根据ck权重，重新进行容器内的ck排序
> * 机器人对接
> * 容器管理
> * 公告编辑
> * 过期通知模板
***
## 准备工作
>- 获取授权token，科学上网后，关注频道[Rabbit](https://t.me/Rabbit_one)并进入群组：[Rabbit的窝边草](https://t.me/RabbitOneA)，通过验证后，在群组内发送 `/start@RabbitMarkit_Bot`，然后找[机器人](https://t.me/RabbitMarkit_Bot)发送 `我的信息`即可看到token
***
## 部署教程
> ### 1. 安装docker
> * [Centos-docker安装教程](https://www.runoob.com/docker/centos-docker-install.html)
> * [Ubuntu-docker安装教程](https://www.runoob.com/docker/ubuntu-docker-install.html)
> * [Debian-docker安装教程](https://www.runoob.com/docker/debian-docker-install.html)
> ### 2. 拉取RabbitPro镜像
> > - ```docker pull ht944/rabbitpro:latest```  
> > - 拉取不到时，设置代理：  
> > - ```docker --registry-mirror=https://docker.mirrors.ustc.edu.cn pull ht944/rabbitpro:latest```
> ### 3. 新建一个文件夹，用于存放RabbitPro的数据
> ```mkdir rabbit```
> ### 4.切换至rabbit文件夹，新建一个data文件夹，用于存放RabbitPro的数据，配置文件等
> *如果有旧数据，可以将其文件复制在data文件夹下*
> - ```cd rabbit``` 进入rabbit文件夹 
> - ```mkdir data``` 新建data文件夹
> ### 5. 启动RabbitPro容器
> *1234端口不要改，5701端口可以改成其他端口*  
> *`--restart=always` 为容器设置自动重启，有需要自动添加*  
> - ```docker run   --name rabbitpro -p 5701:1234  -d  -v  "$(pwd)"/data:/Rabbit/data -it ht944/rabbitpro:latest```
> ### 6. 访问RabbitPro的管理页面
> - ```http://ip:5701/admin```  
> - 默认账号：admin
> - 默认密码：admin
> - 账号密码连续错误5次以上，会被永久锁系统，无法登录，需自行重启容器
> - 重启容器命令：```docker restart rabbitpro```
> ### 7. 修改配置文件
> - 进入配置文件界面：```http://ip:5701/admin#/settings/settings```
> - 修改管理员账密，RabbitToken，ServerHost等，选取可用host，其他参数按需修改
> - 每日上车人数大于20人的，建议配置登录代理，可用[携趣(点我跳转)](https://www.xiequ.cn/index.html?fddd8aac)、[星空(点我跳转)](http://www.xkdaili.com/?ic=4q4d4q5a)等代理
***
## 升级方法
> 不要长时间不更新镜像，否则会出现无法更新的情况，同时数据会有问题，删除容器重建时，切记记得先更新镜像
> - 方法一：在管理页面，点击检查更新，确认更新，耐心等待
> - 方法二：执行以下命令： `docker run --rm -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower -c --run-once 容器名`
> - 方法三：删除容器，重新拉取镜像，重新启动容器
> - 方法四：执行以下命令： `docker exec -it 容器名 bash ` 然后执行 `git pull`，再执行 `exit`，最后执行 `docker restart 容器名`
***
## 高级功能
> ### 1. 机器人对接
> > - 根据各机器人教程进行配置，现有机器人有[bncr](https://t.me/red_Lights_Districts)，奥特曼，[傻妞](https://t.me/trialerr)，[xdd](https://t.me/+TG1EzQIDkDxmMzY9)等，机器人相关问题，去对应的群组反馈  
> ### 2. 配置登录提醒，管理页面登录提醒等  
> - 进入配置文件界面：```http://ip:5701/admin#/settings/settings```
> - 添加WXPUSHER_APP_TOKEN和WXPUSHER_UID
> - 点击测试发送通知，收到通知即配置成功
> > wxpusher教程，进入[管理页面](https://wxpusher.zjiecode.com/admin/main/app/appInfo)，新建一个应用，保存好appToken，然后点击关注应用，打开微信扫描二维码，关注后，点击 我的 -> 我的UID ，即可获取uid
> ### 3. 配置一对一通知
> - 进入容器管理页，新建容器或者编辑容器，滑至最下方，将前面获取的appToken填入WxPusher框内，点击保存
> - 进入wxpusher的[管理页面](https://wxpusher.zjiecode.com/admin/main/app/appInfo)，选择刚刚创建的应用，点击修改，在事件回调地址处填写你的服务器地址，例如：http://ip:5701/api/wxpusher ，ip需要公网可访问的，不确定ipv6是否可行
> - 扫码或短信登录完后，点击当前账号位置切换至需要绑定通知的账号，打开微信扫描下方的二维码，收到绑定成功的通知即为绑定成功
> - 过期通知模板可在管理页面的过期通知处进行修改，注意修改时，{{ pin }}不要删掉，位置任意
***
## 4. 开发者
> ### 自定义前端，机器人插件开发，自定义管理页面等
> - RabbitPro开发文档: http://127.0.0.1:5701/swagger (换成自己的ip)
> ### 自定义登录前端
> - 将容器内的/Rabbit/Frontend目录映射出来，html页面放在templates的index.html文件中，其他文件放在static目录下
> ### 自定义管理页面
> - 将容器内的/Rabbit/Frontend目录映射出来，html页面放在templates的admin_index.html文件中，其他文件放在static目录下
