const express = require("express");
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');

    router.get('/b2b/cart/profile', async (req, res) => {
        if (req.session.user) {
            const user_id = req.session.user.id;
            const sql = "SELECT  sub_admin.id ,name ,phone ,role,SubAdminImageId,LicenceImageId,address_sub_admin.address_id ,Village ,P_O,City,district,State,Pin  FROM address_sub_admin INNER JOIN address ON address_sub_admin.address_id = address.address_id  INNER JOIN sub_admin ON sub_admin.id = address_sub_admin.sub_admin_id and sub_admin.id = ?;";
            // const sql1 = "SELECT  id ,name ,phone  FROM User_Tbl where User_Tbl.id = ?;";
    
            db.query(sql, [user_id], (err, data) => {
                if (err) {
                    return res.json(err);
                }
                if (data.length > 0) {
                    //  res.json("Success");
                    return res.json([data[0], true]);
                
                }
            })
    
        }
    
})


module.exports = router;