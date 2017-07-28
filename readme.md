## 这是我的基于第一个todolist逻辑做的第二个Todolist。打包工具为webpack，项目主体采用react+redux，css采用stylus编写。陌生的东西们，一起攻过来吧。
# 项目背景
### 因为之前采用的是create-react-app，总是感觉有点束手束脚，同时很早之前踩过了webpack的坑，今天来将所学集中一下，看看能否基于webpack完全重构我之前的小项目。
* * *
#  项目进度
* * *
##### 1.配置好了webpack对react,babel,less,css,stylus,html,jpg图片等的loader
##### 2.~~大方向上将App的逻辑往List上挪移，我们可以看到App更加简洁了，便于我们管理~~我又改主意了，还是都放在App里面吧，首先，这是个比较简单的项目，分在两个文件来维护逻辑反而会导致这个项目更加复杂混乱。
##### 3.`initTodos`和`addTodo`完成(增加操作和加载操作)
##### 4.修改deleteTodo和RestoreTodo为 ==== > toggleTodo,两者逻辑相反。
##### 5.添加index的逻辑放置到reducer中，不过并没有放在state外面，因为简化了handle函数操作，同时将handle改为箭头函数直接放入render之中


#  当前要做
##### 1.更改业务逻辑的位置，不在render中作筛选，改在其他地方做筛选(2017-7-28至今未做。)
```
    render() {
        const {contents} = this.props;
        // 所以目前我是没有办法实现localStorage的，因为这个每次重新加载都是为空
        let need_to_do = [];
        let finish = [];
        for ( let obj of contents ) {
            if (obj.flag === true) {
                need_to_do.push(obj);
            } else {
                finish.push(obj);
            }
        }
```
# 目前出现的问题
##### 1.webpack打包慢的问题
> 解决方案：
##### 2.webpack打包错误，Unexpected token:static propTypes
> 解决方案
来自segmentfault，静态属性需要安装插件
``npm install --save-dev babel-preset-stage-0``
``presets:['react','es2015','stage-0']]``
##### 3.关于异步加载的问题
如果在handlesubmit中保存localst会出现少一个的情况，需要寻找一个异步操作的方法，让addTo先执行完
```
    _saveLocalStorage() {
        let {contents} = this.props;
        contents = JSON.stringify(contents);
        localStorage.setItem('user_contents', contents);
    }
    handleSubmit(obj) {
        this.props.addTodo(obj);
    }
```
> 
解决方案1:
目前打算更改逻辑的位置，显然这是很麻烦的。。我先不用这种方法解决
解决方案2:
我另外写一个变量存放初始数据，然后另外添加，另外保存在localStroage
```
    handleSubmit(obj) {
        const {contents}=this.props;
        const newContents=[...contents,obj];
        localStorage.setItem('user_contents',JSON.stringify(newContents));
        // 上面是localst自己的，下面才是store里的
        this.props.addTodo(obj);
    }
```
**但是这！！在逻辑上必然是有问题的，一件事情做成了两件事情！！！！非常有问题。**
解决方案3：
我感觉我顿悟了！！！！！！！！！！！！！，我可以在render里面写啊！！！！我在reducer给我新增的消息里面添加flag和index(分别判断todo是否完成和todo的id)，然后在render写，这样我就不用重复给我的所有信息赋值index了，我从store中来，从store中去！！！最主要的是，我也不用考虑异步的问题了。render永远在click之后那么可以保证存在localStorage的数据不会少掉一条

##### 5.非常有趣的问题收录
```
  _loadLocalStorage() {
        let contents = localStorage.getItem('user_contents');
        if (contents && contents.length&&contents!=='[]') {
            console.log(contents.length,contents[0],contents[1]);
            console.log("进入了localStorage");
            contents = JSON.parse(contents);
            this.props.initTodos(contents);
        //通过这里我们使localstorage对state里的数据起作用
        } else {
            console.log("localStorage里没有可加载的数据")
        }
    }
和
        localStorage.setItem('user_contents',contents);
        // localStorage.setItem('user_contents', JSON.stringify(contents));
        // 如果是stringify了之后判断就不同了哈哈哈
```
##### 6.关于reducer中的todo_index赋值出现的严重问题。
```
import { ADD_TODO, INIT_TODOS,TOGGLE_TODO,CLEAR_TODOS } from './actions';
let todo_index = 0;
function todo_reducer(state, action) {
    if (!state) {
        state = {
            contents: []
        }
    }
    switch (action.type) {
    case ADD_TODO:
    	console.log(todo_index);
        retur
```
reducer中我的赋值过程是这样的，但是这也导致，每次不小心的刷新，todo_index又变回了 0 ！！！！！！！！！！
必须保证todo_index为当前元素的值，因此我这个逻辑结构需要修改
目前想到的解决方案有这么几种：
1.在store中除了contents之外额外维护一个todo_index(最后我没做成功，用了第二种)
2.直接在reducer中使用，但是增加一个localStorage来控制，防止其归零的情况
##### 7.关于函数式写法的探究
是有中间变量的js效率更高，还是简洁的函数更高。
同时，函数式会不会出现两次循环的问题，比如我自己代码中的
```
        return {
            contents: state.contents.filter(obj => obj.flag).map(obj => {
                return Object.assign({}, obj, {
                    index: todo_index++
                })
            })
        }
```

# 弄明白的
##### 1.所谓components和containers，其实大致上都是一样的东西，唯一的不同只是是否纯净。不如一个要接触localSt，一个不用接触，而除此之外，两者几乎是一样的。不过我们也能在其中感受到一些好处，比如说我在component里面的input写入判断是否为空，这样我在container就能放心的认定其传值有效。
##### 2.Redux中只需要把action创建函数的结果传给dispatch()方法即可发起一次dispatch过程
##### 3.如果数据有变动那么就可能会render两次，比如我上文的init本地存储的操作，如果呢，没有那个init操作去改变数据，就只会出现一个render，而如果要是有了那个init，就会出现两次render,同时也可以看出我们每次在add一次之后会render
##### 4.一个基础问题，[]是true，判断数组为空要  ``if(array && array.length)``
##### 5.下面这句话来自react小书----``我们可以把这种特性应用在 state 的更新上，我们禁止直接修改原来的对象，一旦你要修改某些东西，你就得把修改路径上的所有对象复制一遍``
```
    case DELETE_TODO:
        return {
            contents: [...state.contents.slice(0, action.index),
                Object.assign({}, state.contents[action.index], {
                    flag: false
                }),
                ...state.contents.slice(action.index + 1)
            ]
        }
```
##### 6.只有通过action才能修改数据，否则都是无效的
```
    handleSubmit(content) {
        // const {contents}=this.props;
        // const newContents=[...contents,content];  
        // 经过测试，这句话并不起作用
        // 符合预期，只能通过action调用state.
        // localStorage.setItem('user_contents',JSON.stringify(newContents));
        // 上面是localst自己的，下面才是store里的
        this.props.addTodo(content); //这句话是对state起作用的
    }
```
##### 7.有时候优化逻辑，才是简化代码的最好办法，当然寻找一种看起来舒爽的编码方式也是有效的
**比如说我在自己render中加入的localStorage.setItem，简直少了无数步代码，少了异步操作**
因为每一次修改数据，都会调用一次render，而直接写在render的开头，刚好。
# 需要弄明白的
##### 1.关于import进index.js里面的css的顺序问题