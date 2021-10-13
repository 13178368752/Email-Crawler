const express = require('express');
const router = express.Router();

const {crawler} = require("./crawler");


// crawler api
router.post('/crawler',async (req,res)=>{
    let url=JSON.stringify(req.body);
    let arr=JSON.parse(url)
    crawler(arr.url).then(e=>{res.send(e);console.log(e)}).catch(err=>{console.log(err)})

})



module.exports = router;