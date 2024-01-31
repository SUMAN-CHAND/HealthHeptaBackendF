const express = require("express");
const app = express();
const router = express.Router();
const db = require('../../DB_Con.js');
const session = require("express-session");

// Route for delivery partner to accept an order
router.post('/delivery_partner/orders/accept/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    // Update the order status in the database to indicate acceptance
    const sql = 'UPDATE orders SET status = ? WHERE id = ?';

    db.query(sql, ['Delivery Persion Accepted', orderId], (err) => {
        if (err) {
            console.error('Error updating order status:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json({ message: 'Order accepted' });
    });
});
// Route for delivery partner to accept an order
router.post('/delivery_partner/orders/complete/:orderId', async (req, res) => {
    if (req.session.user) {
        try {
            const user = req.session.user;
            const userId = req.session.user.id;

            const orderId = req.params.orderId;

            // Get the Commission from DB
            const commission = await new Promise((resolve, reject) => {
                const sql1 = "select * from delivery_partner_services where service_type = 'Medicine Order';";
                db.query(sql1, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
            // console.log(commission);
            const addOrderToPartner = await new Promise((resolve, reject) => {
                const sql2 = "INSERT INTO delivery_partner_commision (partner_id, service_type,order_id, commision_type,commision) VALUES (?,'Medicine Order' ,?, ?,?);";
                db.query(sql2, [userId, orderId, commission[0].commision_type, commission[0].commision], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.insertId); // Get the newly inserted order ID
                    }
                });
            });


            // Update the order status in the database to indicate acceptance
            const sql = 'UPDATE orders SET status = ? WHERE id = ?';

            db.query(sql, ['Completed', orderId], (err) => {
                if (err) {
                    console.error('Error updating order status:', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                res.json({ message: 'Order accepted' });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    } else {
        res.status(404).send("Data not found");
    }
});

module.exports = router;