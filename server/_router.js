

import express from 'express'
import _proxy from './_proxy'

const router = express.Router();

router.post('/api/_proxy', (req, res, next) => {

    let cookie = req.get('Cookie');
    _proxy({

        requestInfo: req.body.requestInfo,
        cookie: cookie

    }).then(function(result, cookie){

        cookie&&res.append('Set-Cookie', cookie);
        res.send(JSON.stringify(result));    

    }).catch(function(){

        res.send(JSON.stringify({
        	error:0
        }));    

    })
});

export default router;