
import axios from 'axios'
import querystring from 'querystring';

function _proxy (opt ,response) {

    return new Promise(function (resolve) {
			let l = opt.requestInfo.length;
			let cookie, startTime = new Date().getTime();
			let resResult = {}
			opt.requestInfo.map( x => {
				axios.post(x.url, querystring.stringify(x.data), {headers: {
					Cookie: opt.cookie ? opt.cookie : ''
				}}).then(function(res){
					handle(x,res)
				}).catch(function(err){
					handle(x,err)
				})
			})

			function handle(x,res){
				l--;
				let name = x.name;
				let result = {};
				let separator_start = '|qgz-s|';
				let separator_end = '|qgz-e|';
				let statusText = res.statusText || (res.response&&res.response.statusText);
				let status = res.status || (res.response&&res.response.status);
				if(res.errno || !res.status || status !== 200){
					result ={
						"errno" : statusText,
						"code" : status,
						"status" : status,
						"name" : name
					}
					resResult[name] = result;
    				console.log('error')
					console.log(name + ':'+ (new Date().getTime() - startTime ) + 'ms');
				}else{
					console.log(res.data)
					result = res.data;
					result.name = name;
					resResult[name] = result;
					console.log(name + ':'+ (new Date().getTime() - startTime ) + 'ms');
				}
				// resResult.push(result);
    			//response.write( separator_start + JSON.stringify(result) + separator_end);
			    !l&&resolve(resResult,cookie);

			}

    });
}
export default  _proxy;