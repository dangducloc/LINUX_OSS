const handle = require("../DB/connect");
const checkCookie = require("./checkCookie");
const pool = handle.pool;

exports.getComments = async (req,res)=>{
    const idfood = req.params.idfood;
    const check = checkCookie(req,req);
    if(check.success == true){
        const rs = await handle.showComments(pool,idfood);
        res.send(rs);
    }else{
        res.send("fail");
    }
}

exports.postComment = async (req, res)=> {
    const {idfood,commentText} = req.body;
    const check = checkCookie(req,req);
    if(check.success == true){
        const userid = check.user.IDUser;
        const rs = await handle.postComment(pool,userid,idfood,commentText);
        res.send(rs);
    }else{
        res.send("fail");
    }
}