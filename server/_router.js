

import express from 'express'
import _proxy from './_proxy'

const router = express.Router();

router.use('/api/proxy', (req, res, next) => {
    let cookie = req.get('Cookie');
    // res.writeHead(200, {
    //     //'Content-Type': 'text/html; charset=utf-8',
    //     'Content-Type': 'application/json ; charset=utf-8',
    //     //'Content-Type': 'application/x-www-form-urlencoded',
    //     //'Transfer-Encoding': 'chunked',
    //     //'Vary': 'Accept-Encoding',
    //     //'Set-Cookie': 'test=1;',
    //     //'Connection': 'keep-alive'
    // }) 
       
    _proxy({

        requestInfo: req.body.requestInfo,
        cookie: cookie

    }, res).then(function(result, cookie){
        //cookie&&res.append('Set-Cookie', cookie);

        res.end();    

    }).catch(function(){
        console.log(123)
        res.send( JSON.stringify({
            code:-99,
            msg:'error!'
        }));    
     
    })
});

export default router;