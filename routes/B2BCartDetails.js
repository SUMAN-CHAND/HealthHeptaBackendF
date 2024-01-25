const express = require("express");
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');

router.get('/b2b/cart', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.id
        console.log(user_id)
        const sql1 = "SELECT  product_name , product_price , cart_id,discount,quantity , sgst,cgst FROM b2b_product INNER JOIN b2b_cartTable ON b2b_product.product_id = b2b_cartTable.product_id AND b2b_cartTable.sub_admin_id = ?;";

        db.query(sql1, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(null);
            }
            if (data.length > 0) {
                //  res.json("Success");
                // console.log(data)
                return res.json(data);
            } else {
                console.log(data)
                return res.json(null)
            }
        })
    } else {
        // res.send(500,"data not found")
    }
})


module.exports = router;