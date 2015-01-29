## websocket
nodejs websocket data mock

## 技术构架
* 开发框架 [faye-websocket](https://github.com/faye/faye-websocket-node)

## 快速开始
### 1.下载项目

```sh
git clone giturl
```
 
切换分支

```sh
cd websocket
```

### 2.安装环境包

```sh
npm install
```

### 3.run
用node 命令或者ide的功能启动服务

### 4.如何添加自己的mock数据
* dataApi新建自己的mock数据json文件。
* ws.js文件里添加自己的代码，用event区分处理的是自己的socket请求, 添加在ws.on('message',function(event){})里

```
    var data = JSON.parse(event.data);
    if(data.event == 'ws:heartbeat'){
        fs.readFile('./dataApi/heart.json', {encoding: 'utf-8'}, function (err, data) {
            if (err) throw err;
            ws.send(data);
        });
    }
    else if(data.event == 'resource:bind'){
        ws.send(JSON.stringify({"resourceId":"biz21776346","resourceType":"app"}));
    }
```


### ps:运行ws.js文件，index.js是用socket.io实现的websocket，需要客户端添加js文件。