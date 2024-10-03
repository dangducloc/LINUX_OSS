const handle = require("../DB/connect");
const checkCookie = require("./checkCookie");
const pool = handle.pool;

exports.checkOut = async (req, res) => {
    const {payment,address} = req.body;
    const check = checkCookie(req, req);
    if (check.success == true) {
        const idUser = check.user.IDUser;
        const rs = await handle.checkOut(pool,idUser,address,payment);
        res.send(rs);
    } else {
        res.send({error:true,msg:"You must login to checkout !!"});
    }
}