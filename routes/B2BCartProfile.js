const express = require("express");
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');

router.get('/b2b/b2b-employee/profile', async (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.id;
        const user = req.session.user;
        if (user.role === 'b2b_employee') {
            try {
                // const user_id = req.session.user.id;
                const query = "select sub_admin_id from b2b_carttable where b2b_carttable.b2b_employee_id = ?;";
                const subAdmins = await new Promise((resolve, reject) => {
                    db.query(query, [user_id], (err, result) => {
                        if (err) {
                            console.error("Error retrieving data: " + err.message);
                            reject(err);
                        } else {
                            // console.log('Data retrieved successfully');
                            resolve(result);
                        }
                    });
                });
                if (subAdmins.length > 0) {
                    // console.log(subAdmins[0].sub_admin_id);
                    const sql = "SELECT  sub_admin.id ,name ,phone ,role,SubAdminImageId,LicenceImageId,address_sub_admin.address_id ,Village ,P_O,City,district,State,pin_code  FROM address_sub_admin INNER JOIN address ON address_sub_admin.address_id = address.address_id  INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id and sub_admin.id = ?;";
                    db.query(sql, [subAdmins[0].sub_admin_id], (err, result) => {
                        if (err) {
                            console.error("Database error: " + err);
                            reject(err);
                        } else {
                            return res.json([result[0], true, user.role]);
                        }
                    });
                } else {
                    return res.json([]); // Return an empty response if no doctor details found
                }
            } catch (e) {
                console.error("Error: ", e);
                return res
                    .status(500)
                    .json({ error: "Error retrieving sub admin details from the database" });
            }

        } else {
            const sql = "SELECT  sub_admin.id ,name ,phone ,role,SubAdminImageId,LicenceImageId,address_sub_admin.address_id ,Village ,P_O,City,district,State,pin_code  FROM address_sub_admin INNER JOIN address ON address_sub_admin.address_id = address.address_id  INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id and sub_admin.id = ?;";
            // const sql1 = "SELECT  id ,name ,phone  FROM user_tbl where User_Tbl.id = ?;";

            db.query(sql, [user_id], (err, data) => {
                if (err) {
                    return res.json(err);
                }
                if (data.length > 0) {
                    //  res.json("Success");
                    return res.json([data[0], true, user.role]);

                }
            })

        }
    }
})

router.get('/b2b/cart/profile', async (req, res) => {
    if (req.session.user) {
        const user_id = req.session.user.id;
        const user = req.session.user;
        if (user.role === 'b2b_employee') {
            return res.json([user.name, true, user.role]);


        } else {
            const sql = "SELECT  sub_admin.id ,name ,phone ,role,SubAdminImageId,LicenceImageId,address_sub_admin.address_id ,Village ,P_O,City,district,State,pin_code  FROM address_sub_admin INNER JOIN address ON address_sub_admin.address_id = address.address_id  INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id and sub_admin.id = ?;";
            // const sql1 = "SELECT  id ,name ,phone  FROM user_tbl where User_Tbl.id = ?;";

            db.query(sql, [user_id], (err, data) => {
                if (err) {
                    return res.json(err);
                }
                if (data.length > 0) {
                    //  res.json("Success");
                    return res.json([data[0], true, user.role]);

                }
            })

        }
    }
})


module.exports = router;