const express = require("express");
const app = express();
const router = express.Router();
const db = require('../../DB_Con.js');


router.get('/superadmin/partner-commissions', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.id
        const sql1 = "SELECT * from partner_services;";
        db.query(sql1, (err, data) => {
            if (err) {
                return res.json(err);
            }
            if (data.length > 0) {
                //  res.json("Success");
                // orders.push(data);
                return res.json(data);
            } else {
                return res.json(null);
            }
        })
    } else {
        res.status(500).send("data not found")
    }
})
router.get('/partner/commission/:order_id', async (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.id
        const order_id = req.params.order_id;
        // Get the Commission from DB


        const commission = await new Promise((resolve, reject) => {
            const sql1 = "SELECT * from partner_commision where order_id = ?;";
            db.query(sql1, [order_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        console.log(commission);
        const Payment = await new Promise((resolve, reject) => {
            const sql2 = "select  * from payments where order_id = ?";
            db.query(sql2, [order_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result); // Get the newly inserted order ID
                }
            });
        });
        console.log(Payment)
        return res.json([commission,Payment]);

    } else {
        res.status(500).send("data not found")
    }

})


module.exports = router;