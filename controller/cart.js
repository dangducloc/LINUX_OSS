const handle = require("../DB/connect");

const pool = handle.makePool();

function checkCookie(req,res){
    const cookie = req.cookies['user'];
    if(cookie != null || cookie != undefined){
        const foo = Buffer.from(cookie, 'base64').toString('utf-8');
        const raw_data = JSON.parse(Buffer.from(foo, 'base64').toString('utf-8')); 
        return {success:true,user:raw_data.user};
    }else{
        return {success:false};
    }
}

exports.addcart = async function (req, res) {
    const idfood = req.body.idfood;
    const check = checkCookie(req,req);
    if(check.success == true){
        const userid = check.user.IDUser;
        const rs = await handle.addCart(pool,userid,idfood);
        res.send(rs);
    }else{
        res.send("fail");
    }
};
