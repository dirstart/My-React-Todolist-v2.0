## 这是我的基于第一个todolist逻辑做的第二个Todolist。打包工具为webpack，项目主体采用react+redux，css采用stylus编写。陌生的东西们，一起攻过来吧。
# 项目背景
### 因为之前采用的是create-react-app，总是感觉有点束手束脚，同时很早之前踩过了webpack的坑，今天来将所学集中一下，看看能否基于webpack完全重构我之前的小项目。
* * *
#  项目进度
* * *
##### 1.配置好了webpack对react,babel,less,css,stylus,html,jpg图片等的loader
##### 2.~~大方向上将App的逻辑往List上挪移，我们可以看到App更加简洁了，便于我们管理~~我又改主意了，还是都放在App里面吧，首先，这是个比较简单的项目，分在两个文件来维护逻辑反而会导致这个项目更加复杂混乱。

# 目前出现的问题
##### 1.webpack打包慢的问题
> 解决方案：
##### 2.webpack打包错误，Unexpected token:static propTypes
> 解决方案
来自segmentfault，静态属性需要安装插件
``npm install --save-dev babel-preset-stage-0``
``presets:['react','es2015','stage-0']]``

# 弄明白的
##### 1.所谓components和containers，其实大致上都是一样的东西，唯一的不同只是是否纯净。不如一个要接触localSt，一个不用接触，而除此之外，两者几乎是一样的。不过我们也能在其中感受到一些好处，比如说我在component里面的input写入判断是否为空，这样我在container就能放心的认定其传值有效。
##### 2.Redux中只需要把action创建函数的结果传给dispatch()方法即可发起一次dispatch过程

# 需要弄明白的
##### 1.关于import进index.js里面的css的顺序问题