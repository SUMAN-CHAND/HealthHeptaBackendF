const express = require("express");
const app = express();
const router = express.Router();
const db = require('../../DB_Con.js');



router.get('/delivery_partner/home/profile', async (req, res) => {
    // console.log("req")
    // console.log(req.session.user)
    if (req.session.user) {
        const user_id = req.session.user.id;
        // console.log(user_id)
        const sql = "SELECT  delivery_partner.id ,name ,ph_num ,address_delivery_partner.address_id ,Village ,P_O,City,district,State,Pin  FROM address_delivery_partner INNER JOIN address ON address_delivery_partner.address_id = address.address_id  INNER JOIN delivery_partner ON delivery_partner.id = address_delivery_partner.delivery_partner_id and delivery_partner.id = ?;";

        db.query(sql, [user_id], (err, data) => {
            if (err) {
                console.log(err)
                return res.json(err);
            }
            else if (data.length > 0) {
                // console.log(data)
                res.json(data);

                // const sql = 'SELECT * FROM images where id = ?';

                // db.query(sql, [data[0].SubAdminImageId], (err, result) => {
                //     if (err) {
                //         console.error('Database error: ' + err);
                //         res.status(500).json({ error: 'Database error.' });
                //     } else {
                //         // res.json(result);
                //         return res.json([data[0], true, result]);
                //     }
                // });

                //  res.json("Success");
                // } else {
                //     db.query(sql1, [user_id], (err, data) => {
                //         if (err) {
                //             return res.json(err);
                //         }
                //         if (data.length > 0) {
                //             //  res.json("Success");
                //             return res.json([data[0], false]);
                //         } else {
                //             return res.json("Faile");
                //         }
                //     })
            }
        })

    }
    else {
        res.status(500).send("data not found")
    }
})

// Route for super admin to view product details
router.get('/deleviry_partner/assigned/orders',(req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.id;
        // console.log(user_id)
        // View Product details by id
        const sql = "SELECT orders.id, product.product_id , user_id,order_date,status,payment_status,payment_type,total_amount,quantity ,product_name,product_price,description,assign_delivery_persion_id,expected_delivery_date FROM product INNER JOIN order_items ON product.product_id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN payments ON orders.id = payments.order_id where orders.assign_delivery_persion_id = ? and orders.status !='Completed';";

        db.query(sql, [user_id], (err, data) => {
            if (err) {
                console.error('Error updating order status:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }else{

                res.json(data);
            }
            // console.log(data);
        });
    }
    else {
        res.status(500).send("data not found")
    }
});

router.get('/delivery_partner/profile-details', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.id;
        const user = req.session.user;
        // console.log(user)
        // var address = [];
        //     const sql = "Select * from address where user_id = ?";
        //     // const sql1 = "Select COUNT(`cart_id`) AS namesCount from CartTable where user_id = ?";
        //     db.query(sql, [user_id], (err, data) => {
        //         if (err) {
        //             return res.json(err);
        //         }
        //         address = data;
        //     })
        // console.log(user)
        return res.json([user]);




        // else {
        //     // console.log('else')
        //     const sql = "SELECT  b2c_partner.id ,name ,ph_num ,address_partner.address_id ,Village ,P_O,City,district,State,Pin  FROM address_partner INNER JOIN address ON address_partner.address_id = address.address_id  INNER JOIN b2c_partner ON b2c_partner.id = address_partner.partner_id and b2c_partner.id = ?;";
        //     const sql1 = "Select COUNT(`cart_id`) AS namesCount from CartTable where user_id = ?";
        //     db.query(sql, [user_id], (err, data) => {
        //         if (err) {
        //             return res.json(err);
        //         }
        //         address = data;
        //     })
        //     db.query(sql1, [user_id], (err, data) => {
        //         try {
        //             if (err) {
        //                 return res.json(err);
        //             }
        //             if (data.length > 0) {
        //                 //  res.json("Success");

        //                 // console.log(data)
        //                 // console.log(address)
        //                 return res.json([data[0].namesCount, user_id, address[0].City]);
        //             } else {
        //                 return res.json("Faile");
        //             }
        //         } catch (error) {
        //             // console.log(error)
        //         }

        //     })

        // }
    } else {
        // console.log("user not found");
        // req.session.user = user;
        return res.json(null)
    }
})



module.exports = router;