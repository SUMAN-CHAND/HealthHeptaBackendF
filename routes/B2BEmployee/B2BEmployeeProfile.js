const express = require("express");
const router = express.Router();
const db = require('../../DB_Con.js');

router.get('/b2b-employee/profile-details', (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.id;
        const user = req.session.user;
        // console.log(user)
        var address;
        if (true) {
            // const sql = "Select * from address where user_id = ?";
            const sql = "select * from b2b_employee where  id = ?;";
            // const sql2 = "SELECT  id ,name ,phone ,role FROM sub_admin where sub_admin.id = ?;";

            // const sql1 = "Select COUNT(`cart_id`) AS namesCount from b2b_carttable where sub_admin_id = ?";
            db.query(sql, [user_id], (err, data) => {
                if (err) {
                    return res.json(err);
                }
                return res.json([0, user_id]);

                // console.log(data)
            })
            // db.query(sql1, [user_id], (err, data) => {
            //     try {
            //         if (err) {
            //             return res.json(err);
            //         }
            //         if (data.length > 0) {
            //             //  res.json("Success");

            //             // console.log(data)
            //             // console.log(address)
            //             return res.json([data[0].namesCount, user_id, address[0].City]);
            //         } else {
            //             return res.json(null);
            //         }
            //     } catch (error) {
            //         // console.log(error)
            //     }

            // })
        }
    } else {

        // req.session.user = user;
        return res.json("0")
    }
})


router.get('/b2b-emp/home/profile', async (req, res) => {
    if (req.session.user) {
        // console.log(req.session.user)
        return res.json(req.session.user);

        // const user_id = req.session.user.id;
        // const sql = "SELECT  b2c_partner.id ,name ,ph_num ,address_partner.address_id ,Village ,P_O,City,district,State,Pin  FROM address_partner INNER JOIN address ON address_partner.address_id = address.address_id  INNER JOIN b2c_partner ON b2c_partner.id = address_partner.partner_id and b2c_partner.id = ?;";
        // const sql1 = "SELECT  id ,name ,phone ,role FROM sub_admin where sub_admin.id = ?;";

        // db.query(sql, [user_id], (err, data) => {
        //     if (err) {
        //         return res.json(err);
        //     }
        //     if (data.length > 0) {

        //         res.json(data);

        //         // const sql = 'SELECT * FROM images where id = ?';

        //         // db.query(sql, [data[0].SubAdminImageId], (err, result) => {
        //         //     if (err) {
        //         //         console.error('Database error: ' + err);
        //         //         res.status(500).json({ error: 'Database error.' });
        //         //     } else {
        //         //         // res.json(result);
        //         //         return res.json([data[0], true, result]);
        //         //     }
        //         // });

        //         //  res.json("Success");
        //         // } else {
        //         //     db.query(sql1, [user_id], (err, data) => {
        //         //         if (err) {
        //         //             return res.json(err);
        //         //         }
        //         //         if (data.length > 0) {
        //         //             //  res.json("Success");
        //         //             return res.json([data[0], false]);
        //         //         } else {
        //         //             return res.json("Faile");
        //         //         }
        //         //     })
        //     }
        // })

    }
})
router.get('/b2b/sub_admin/profile/:sub_admin_id', async (req, res) => {
    
        const sub_admin_id = req.params.sub_admin_id;
        // const sql = "SELECT  b2c_partner.id ,name ,ph_num ,address_partner.address_id ,Village ,P_O,City,district,State,Pin  FROM address_partner INNER JOIN address ON address_partner.address_id = address.address_id  INNER JOIN b2c_partner ON b2c_partner.id = address_partner.partner_id and b2c_partner.id = ?;";
        // const sql1 = "SELECT  id ,name ,phone ,role FROM sub_admin where sub_admin.id = ?;";
        const sql = "SELECT  sub_admin.id ,name ,phone ,role,SubAdminImageId,LicenceImageId,address_sub_admin.address_id ,Village ,P_O,City,district,State,pin_code  FROM address_sub_admin INNER JOIN address ON address_sub_admin.address_id = address.address_id  INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id and sub_admin.id = ?;";

        db.query(sql, [sub_admin_id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            if (data.length > 0) {
               return res.json(data);
            }
        })


})


module.exports = router;