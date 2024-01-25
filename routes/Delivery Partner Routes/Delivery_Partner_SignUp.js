const express = require("express");
const app = express();
const router = express.Router();
const db = require('../../DB_Con.js');
const e = require("express");
const { json } = require("body-parser");
const bcrypt = require('bcrypt')
const salt = 10;


// route to handle the POST request to add a partner
router.post('/add-delivery-partner', (req, res) => {
    const { name, ph_num, password } = req.body;
    // console.log(req.body)

    if (!name || !ph_num || !password) {
        // console.log('All fields are required');
          return res.status(400).json({ message: 'All fields are required' });
        // return res.json(null);
    }

    // First, check if the ph_num already exists in the database
    const checkQuery = 'SELECT * FROM delivery_partner WHERE ph_num = ?';

    db.query(checkQuery, [ph_num], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking partner existence: ' + checkErr);
            return res.status(500).json({ message: 'Error checking partner existence' });
            // return res.json(null);
        }

        if (checkResult.length > 0) {
            // If a partner with the same ph_num exists, return an error message
            console.log('Partner with this phone number already exists');
            return res.status(409).json({ message: 'Partner with this phone number already exists' });
            // return res.json(null);
        }

        // If the ph_num is not found in the database, proceed to add the new partner
        const insertQuery = 'INSERT INTO delivery_partner (name, ph_num,permission,password) VALUES (?, ?,?,?)';

        bcrypt.hash(password.toString(), salt, (err, hash) => {
            db.query(insertQuery, [name, ph_num, 'Pending', hash], (err, result) => {
                if (err) {
                    console.log(err)
                    console.error('Error adding partner: ' + err);
                      return res.status(500).json({ error: 'Error adding partner' });
                    // return res.json(null);
                }
                // console.log('Partner added successfully');
                res.json(result)
                // res.status(201).json({ message: 'Partner added successfully' });
            });
        })

    });
});


router.post('/delivery-partner/complete_profile', async (req, res) => {
    // console.log('click')
    // console.log(req.body)
    try {  // const sql = "Insert into Sub_Admin (`LicenceImageId`,`SubAdminImageId`) values(?) where id = ?;";
        const sql = "UPDATE delivery_partner SET aadhaar = ?, pan= ?,AadhaarCardImageID=?,PanCardImageID=? WHERE id = ?;";

        try {
            db.query(sql, [req.body.aadhaar, req.body.pan, req.body.AadhaarCardImageID, req.body.PanCardImageID, req.body.partner_id], (err, data) => {

                if (err) {
                    console.log(err)
                    return res.json(null);
                }
                // console.log('success img')
                // return res.json(data);
            })
        } catch (error) {
            return res.json(error)
        }



        const address = [
            req.body.Village,
            req.body.P_O,
            req.body.City,
            req.body.district,
            req.body.state,
            req.body.pin
        ]
        const createAddress = await new Promise((resolve, reject) => {
            const sql = "insert into address (Village,P_O,City,district,state,pin)values(?);";
            db.query(sql, [address], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    // console.log(result.insertId);
                    // console.log('success address')
                    resolve(result.insertId);
                }
            });
        });
        const insertAddressParner = await new Promise((resolve, reject) => {
            const sql1 = "insert into address_delivery_partner (address_id,delivery_partner_id)values(?,?);";
            db.query(sql1, [createAddress, req.body.partner_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                    if (req.session.user) {
                        // return res.json('success',req.session.user)
                       return res.status(200).json(req.session.user);
                       
                    }else{
                        // return res.json('success')
                        return res.status(200).json(req.session.user);
                        // console.log('success address id')
                    }
                }
            });
        });

    } catch (error) {
        console.log(error)
    }

})

//for login
router.post('/delivery_partner/login', (req, res) => {
    const sql = "Select * from delivery_partner where `ph_num` = ? ";
    // console.log(req.body.ph_num)
    db.query(sql, [req.body.ph_num], (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (data.length > 0) {
            // console.log(data)

            if (data[0].permission === 'Pending') {
                return res.json('Not_Approve');
            } else {
                // console.log(data)
                bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                    if (err) {
                        return res.json(err)
                    } if (response) {
                        // console.log(data[0])
                        // const id = data[0].id;
                        // const token = jwt.sign((id),"jwt-secret-key",{expiresIn: '1d'});
                        // res.cookie('token', token);
                        req.session.loggedIn = true; // Set a session variable
                        // req.session.phone = data[0].phone; // Store user information in the session
                        req.session.user = data[0];
                        // console.log(req.session.user)
                        req.session.save();
                        // res.send("User Login ss")
                        // console.log(data[0])
                        return res.json([req.session.user, req.session.loggedIn]);
                    } else {
                        res.json(null)
                    }
                })
            }
        } else {
            return res.json(null);
        }
    })
})



module.exports = router;