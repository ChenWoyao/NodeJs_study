后台运行 redis 服务
  使用命令 brew services start redis
不需要后台运行 redis 服务
  使用命令 redis-server /usr/local/etc/redis.conf
终端运行redis服务
  redis-server
退出
  在服务端中输入 quit
客户端连接
  redis-cli
  redis-cli -h host -p port -a password
强制关闭服务
  sudo lsof -i :6379  6379是Redis对应的端口号
  然后关闭Redis服务，命令如下:
  sudo kill -9 PID
