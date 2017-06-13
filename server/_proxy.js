
import axios from 'axios'


function _proxy (opt) {

    return new Promise(function (resolve) {

			let l = opt.requestInfo.length;
			let result = {}, cookie, startTime = new Date().getTime();

			opt.requestInfo.map( x => {
				axios(x).then(function(res){
					handle(x,res)
				}).catch(function(err){
					handle(x,err)
				})
			})

			function handle(x,res){

				l--;
				let name = x.name;

				if(res.errno){

					result[name] ={
						"errno" : res.errno,
						"code" : res.code
					} 
					console.log(name + ':'+ (new Date().getTime() - startTime )) + 'ms';
				}else{

					result[name] = res.data;
					if(res.headers['set-cookie']) cookie = res.headers['set-cookie'];
					console.log(name + ':'+ (new Date().getTime() - startTime ) + 'ms');
				}

			    !l&&resolve(result,cookie);
			}

    });
}
export default  _proxy;