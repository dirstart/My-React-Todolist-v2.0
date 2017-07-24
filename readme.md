## 这是我的基于第一个todolist逻辑做的第二个Todolist。打包工具为webpack，项目主体采用react+redux，css采用stylus编写。陌生的东西们，一起攻过来吧。
# 项目背景
### 因为之前采用的是create-react-app，总是感觉有点束手束脚，同时很早之前踩过了webpack的坑，今天来将所学集中一下，看看能否基于webpack完成我的一个小项目。
* * *
#  项目进度
* * *
##### 1.配置好了webpack对react,babel,less,css,stylus,html,jpg图片等的loader

# 目前出现的问题
##### 1.webpack打包慢的问题
> 解决方案：
webpack加入
```
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	}
```