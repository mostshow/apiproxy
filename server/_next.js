
import axios from 'axios'
import querystring from 'querystring';

function _next (opt ,response) {

    return new Promise(function (resolve) {
			let l = opt.requestInfo.length;
			let cookie, startTime = new Date().getTime();
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
				let separator = '|qgz|';
				let statusText = res.statusText || res.response.statusText;
				let status = res.status || res.response.status;
				if(res.errno || !res.status || status !== 200){
					result ={
						"errno" : statusText,
						"code" : status,
						"status" : status,
						"name" : name
					}
    				console.log('error')
					console.log(name + ':'+ (new Date().getTime() - startTime ) + 'ms');
				}else{

					result = res.data;
					result.name = name;
					console.log(name + ':'+ (new Date().getTime() - startTime ) + 'ms');
				}
    			response.write( JSON.stringify(result) + separator);
			    !l&&resolve(result,cookie);

			}

    });
}
export default  _proxy;