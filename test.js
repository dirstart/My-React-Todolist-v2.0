let index=100;
function two(a){
	if(arguments.length===0){
		return index;
	}else if(arguments.length===1){
		return arguments[0];
	}
}

console.log(arguments[0].value);