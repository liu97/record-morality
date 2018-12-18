/**
 * 获取所有search键值对
 * @param {Object} props
 */
export const getAllSearch = (props) => {
    const search = props.history.location.search;
    let theRequest = new Object();
    if (search.indexOf('?') != -1) {
        let str = search.substr(1);
        let strs = str.split('&');
        for (let i = 0; i < strs.length; i++) {
            let pairs = strs[i].split('=');
            theRequest[pairs[0]] = (pairs[1]);
        }
    }
    return theRequest;
}
/**
 * 获取特定search键值对
 * @param {Object} props
 * @param {Array} param
 */
export const getGivenSearch = (props, param = []) => {
    const search = props.history.location.search;
    let theRequest = new Object();
    if (search.indexOf('?') != -1) {
        let str = search.substr(1);
        let strs = str.split('&');
        for (let i = 0; i < strs.length; i++) {
            let pairs = strs[i].split('=');
            if( param.indexOf(pairs[0]) != -1 ){
                theRequest[pairs[0]] = (pairs[1]);
            }
        }
    }
    if( typeof(param) == 'string'){
        return theRequest[param];
    }
    return theRequest;
}