// 判断是否为对象
export const isObject = (obj) => {
	var type = Object.prototype.toString.call(obj);
	if(type == '[object Object]'){
		return true;
	}
	return false;
}

// 对象转字符串
export const obj2String = (obj, arr = [], idx = 0) => {
	for (let item in obj) {
	arr[idx++] = [item, obj[item]];
	}
	return new URLSearchParams(arr).toString();
}