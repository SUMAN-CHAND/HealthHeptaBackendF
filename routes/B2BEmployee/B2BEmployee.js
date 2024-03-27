const express = require("express");
const router = express.Router();
const db = require('../../DB_Con.js');
const bcrypt = require('bcrypt')
const salt = 10;


// route to handle the POST request to add a partner
router.post('/add/b2b-employee', (req, res) => {
    const { name, ph_num, email, aadhaar,pan,employee_type,AadhaarCardImageID,PanCardImageID} = req.body;
    // console.log(req.body)

    if (!name || !ph_num || !email) {
        // console.log('All fields are required');
        //   return res.status(400).json({ error: 'All fields are required' });
        return res.json(null);
    }

    // First, check if the ph_num already exists in the database
    const checkQuery = 'SELECT * FROM b2b_employee WHERE ph_num = ? and email = ?';

    db.query(checkQuery, [ph_num, email], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking partner existence: ' + checkErr);
            // return res.status(500).json({ error: 'Error checking partner existence' });
            return res.json(null);
        }

        if (checkResult.length > 0) {
            // If a partner with the same ph_num exists, return an error message
            // console.log('Partner with this phone number already exists');
            // return res.status(409).json({ error: 'Partner with this phone number already exists' });
            return res.json(null);
        }

        // If the ph_num is not found in the database, proceed to add the new partner
        const insertQuery = 'INSERT INTO b2b_employee (name, ph_num,permission,email,role,aadhaar, pan,AadhaarCardImageID,PanCardImageID,employee_type) VALUES (?,?,?,?,?,?,?,?,?,?)';

        // bcrypt.hash(password.toString(), salt, (err, hash) => {
        db.query(insertQuery, [name, ph_num, 'Pending', email,'b2b_employee',aadhaar,pan,AadhaarCardImageID,PanCardImageID,employee_type], (err, result) => {
            if (err) {
                console.log(err)
                console.error('Error adding partner: ' + err);
                //   return res.status(500).json({ error: 'Error adding partner' });
                return res.json(null);
            }
            // console.log('Partner added successfully');
            res.json(result)
            // res.status(201).json({ message: 'Partner added successfully' });
        });
        // })

    });
});

//for login
router.post('/b2b/employee/login', (req, res) => {
    const sql = "Select * from b2b_employee where `id` = ? ";
    // console.log(req.body.ph_num)
    db.query(sql, [req.body.id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (data.length > 0) {
            // console.log(data)
            if (data[0].permission === 'Pending') {
                return res.json('Not_Approve');
            } else {
                // bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (data[0].email === req.body.email[0]) {
                    
                    req.session.loggedIn = true; // Set a session variable
                    req.session.user = data[0];
                    // console.log(req.session.user)
                    req.session.save();
                    return res.json([req.session.user, req.session.loggedIn]);
                } else {
                    res.json(null)
                }
                // })
            }
        } else {
            return res.json(null);
        }
    })
})

module.exports = router;