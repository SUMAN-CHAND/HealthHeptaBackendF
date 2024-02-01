const express = require("express");
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');

router.get('/image/:image_id', (req, res) => {
    const image_id  = req.params.image_id;
    console.log(req.params)
    const sql = 'SELECT * FROM images where id = ?';

    db.query(sql, [image_id], (err, result) => {
        if (err) {
            console.error('Database error: ' + err);
            res.status(500).json({ error: 'Database error.' });
        } else {
            // res.json(result);
            // console.log(result)
            return res.json(result);
        }
    });
})


module.exports = router;