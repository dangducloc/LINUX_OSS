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

exports.addItem = async (req, res)=> {
    const idfood = req.body.idfood;
    const check = checkCookie(req,req);
    if(check.success == true){
        const userid = check.user.IDUser;
        const rs = await handle.addCart(pool,userid,idfood);
        res.send(rs);
    }else{
        res.send("fail");
    }
}

exports.updateItem = async (req,res)=> {
    const {idfood,quantity} = req.body;
    const check = checkCookie(req,req);
    if(check.success == true){
        const userid = check.user.IDUser;
        const rs = await handle.updateItem(pool,userid,idfood,quantity);
        res.send(rs);
    }else{
        res.send("fail");
    }
}

exports.deleteItem = async (req,res)=>{
    const {idfood} = req.body;
    const check = checkCookie(req,req);
    if(check.success == true){
        const userid = check.user.IDUser;
        const rs = await handle.rm_itemFromCart(pool,userid,idfood);
        res.send(rs);
    }else{
        res.send("fail");
    }
}

exports.getCart = async (req,res)=>{
    const check = checkCookie(req,req);
    if(check.success == true){
        const userid = check.user.IDUser;
        const rs = await handle.getCart(pool,userid);
        res.send(rs);
    }else{
        res.send("fail");
    }
}