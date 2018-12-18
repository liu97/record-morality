/**
 * 设置cookie
 * @param {[String]} name    [cookie的键]
 * @param {String} value   [cookie的值]
 * @param {[String]} expires [过期时间]
 * @param {[String]} path    [路径]
 * @param {[String]} domain  [域]
 * @param {[String]} secure  [安全标志]
 */
export const setCookie = (name, value='', expires, path, domain, secure)=>{
	if(!name){
		console.error("You must have a name when setting cookies");
		return false;
	}
    let cookie = encodeURIComponent(name)+ '=' +encodeURIComponent(value);
    //注意分号后面要有空格
    //后面的4个参数是可选的，所以用if判断并追加
    if(expires){ //过期时间
        cookie +='; expires='+expires.toGMTString();
    }
    if(path){ //路径
        cookie += '; path='+path;
    }
    if(domain){ //域
        cookie += '; domain='+domain;
    }
    if(secure){ //安全标志
        cookie += '; secure='+secure;
    }
    document.cookie = cookie;
    return true;
}

/**
 * 获取cookie，传入一个name则获取改对应的值，否则获取全部cookie
 * @param  {[String]} name [cookie的键]
 * @return {[String|Object]}      [cookie值或者所有的cookie对象]
 */
export const getCookie = (name)=>{
	let cookies =document.cookie.split('; ');
	cookies = cookies.reduce(function(result, item){
		let items = item.split('=');
		if(!items[1]){
			items[1] = '';
		}
		result[items[0]] = items[1];
		return result;
	}, {});
	if(typeof(name) == 'string'){
		return cookies[name];
	}
	return cookies;
}

/**
 * 删除cookie
 * @param  {[String]} name    [cookie的键]
 * @param  {[String]} path    [路径]
 * @param  {[String]} domain  [域]
 * @return {[Boolean]}        [操作是否成功]
 */
export const deleteCookie = (name, path, domain)=>{
	if(!name){
		console.warn("You must have a name when setting cookies");
		return false;
	}
	document.cookie = 'name='+name
	                    +'; domain='+domain
	                    +'; path='+path
	                    +'; max-age=0';
	return true;
}