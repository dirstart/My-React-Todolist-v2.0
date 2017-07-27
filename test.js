let a=
[{
	"content": "111",
	"flag": false,
	"index": 0
}, {
	"content": "2222",
	"flag": false,
	"index": 1
}, {
	"content": "333",
	"flag": true,
	"index": 2
}, {
	"content": "444",
	"flag": true,
	"index": 3
}, {
	"content": "5555",
	"flag": false,
	"index": 4
}, {
	"content": "777",
	"flag": false,
	"index": 5
}, {
	"content": "龙卷风崴了脚",
	"flag": true,
	"index": 6
}]
let todo_index=10;
let b=a.filter((obj)=>obj.flag).map(obj=>{
	return Object.assign({},obj,{index:todo_index++});
})
console.log(b);
console.log(todo_index);

// contents:state.contents.filter(obj=>obj.flag).map(obj=>{
// 			console.log(todo_index)
// 			return Object.assign({},obj,{index:todo_index++})
// 		})