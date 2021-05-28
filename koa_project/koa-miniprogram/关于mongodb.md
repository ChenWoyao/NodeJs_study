数据存放路径：
  sudo mkdir -p /usr/local/var/mongodb
日志文件路径：
  sudo mkdir -p /usr/local/var/log/mongodb
mongod 命令后台进程方式：
  mongod --config /usr/local/etc/mongod.conf --fork
这种方式启动要关闭可进入 mongo shell 控制台来实现：
  > db.adminCommand({ "shutdown" : 1 })
删除数据库：
  db.dropDatabase()
数据库中有什么集合：
  show collections
展示用户
  show users
创建用户
db.createUser(
  {
    user: ”test”,
    pwd: ”test”,
    roles: [{role:”readWrite”, db: ””}]
  }
)
db.createUser(
  {
    user: ”admin”,
    pwd: ”admin”,
    roles: [{role:”userAdminAnyDatabase”, db: ”admin”}]
  }
)
删除集合：
db.collection.drop()

MongoDB的默认数据库为"db"，该数据库存储在data目录中。
"show dbs" 命令可以显示所有数据的列表。
执行 "db" 命令可以显示当前数据库对象或集合。
运行"use"命令，可以连接到一个指定的数据库。

admin： 从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。
local: 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合
config: 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。
