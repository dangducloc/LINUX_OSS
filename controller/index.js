const handle = require('../DB/connect.js');
const pool = require('../DB/connect.js').makePool();

exports.getCakes = async function (req, res){
    try {
        const list = await handle.get_all_cakes(pool);
        res.send(list);
    } catch (error) {
        console.error('Error fetching cakes:', error);
        res.status(500).send('An error occurred while fetching cakes.');
    }
};