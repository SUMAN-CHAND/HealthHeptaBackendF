const express = require('express');
// const mysql = require('mysql2/promise'); // Replace with your preferred MySQL driver
const app = express();
const router = express.Router();
const db = require('../../DB_Con.js');
const e = require("express");

// API endpoints
// router.get('/locations', async (req, res) => {
//     try {
//         const [rows] = db.query('SELECT id, name, coordinates FROM locations');
//         // console.log(rows)
//         res.json(rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal server error');
//     }
// });

// router.post('/locations', async (req, res) => {
//     const { name, coordinates } = req.body;

//     try {
//          db.query('INSERT INTO locations (name, coordinates) VALUES (?, ?)', [name, coordinates]);
//         res.send('Location saved successfully!');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal server error');
//     }
// });


module.exports = router;