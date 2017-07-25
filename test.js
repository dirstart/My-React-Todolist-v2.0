const unique=(arr)=>{
	let obj={};
	let new_array=[];
	for(let i=0;i<arr.length;i++){
		if(!obj[arr[i]]){
			new_array.push(arr[i]);
			obj[arr[i]]=true;
		}
	}
	return new_array;
}

var array= [1, 1, 2, 2, 3, 3, 3, '1', '1', '1', '2', '2'];
