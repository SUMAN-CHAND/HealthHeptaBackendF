const express = require("express");
const mysql = require('mysql');
const app = express();
const router = express.Router();
const db = require('../DB_Con.js');

const diff = require("dialogflow-fulfillment");



app.get("/", (req, res) => {
  res.send("from node server updated...")
})
app.post("/webhook", express.json(), (req, res) => {
  const agent = new diff.WebhookClient({
    request: req,
    response: res
  })
  function demo(agent) {
    agent.add("Sending response from webhook server... ")
  }
  function webhookCustomPayload(agent) {
    var payloadData = {
      "richContent": [
        [
          {
            "type": "info",
            "title": "Info item title",
            "subtitle": "Info item subtitle",
            "image": {
              "src": {
                "rawUrl": "https://example.com/images/logo.png"
              }
            },
            "actionLink": "https://example.com"
          }
        ]
      ]
    }

    agent.add(new diff.Payload(agent.UNSPECIFIED, payloadData, { sendAsMessage: true, rawPayload: true }))
  }

  function selectLocation(agent) {

    var payloadData = {
      "richContent": [
        [
          {
            "options": [
              {
                "text": "Kolkata"
              },
              {
                "text": "Berhampore"
              },
              {
                "text": "Others"
              }
            ],
            "type": "chips"
          }
        ]
      ]
    }

    agent.add(new diff.Payload(agent.UNSPECIFIED, payloadData, { sendAsMessage: true, rawPayload: true }))
  }
  // function finalBook(agent) {
  //   var name = agent.context.get("awaiting_name").parameters.person.name;
  //   var email = agent.context.get("awaiting_email").parameters.email;
  //   console.log(name);
  //   console.log(email);

  //   agent.add("Ok Added")
  // }
  
  async function doctorListDoctorChoice(agent) {
    const location = agent.context.get("awaiting_location").parameters["geo-city"];
    const choice = agent.context.get("awaiting_choice").parameters.choice;
    console.log(choice)
  
    if(choice == "Doctor"){
      try {
        const doctors = await fetchDoctors(location);
        console.log(doctors);
    
        // Create a rich content payload with the retrieved doctor information
        const payloadData = {
          "richContent": [
            doctors.map(doctor => ({
              "type": "info",
              "title": doctor.doc_name,
              "subtitle": doctor.doc_desc,
              "image": {
                "src": {
                  "rawUrl": "https://example.com/images/logo.png"
                }
              },
              "actionLink": `https://example.com/${doctor.id}`
            }))
          ]
        };
        
        console.log(payloadData)
    
        // Send the payload as a response
        agent.add(new diff.Payload(agent.UNSPECIFIED, payloadData, { sendAsMessage: true, rawPayload: true }));
      } catch (error) {
        console.log(error);
      }
    }
    else if (choice == "Clinic"){
      try {
        const clinics = await fetchClinics(location);
        console.log(clinics);
    
        // Create a rich content payload with the retrieved doctor information
        const payloadData = {
          "richContent": [
            clinics.map(clinic => ({
              "type": "info",
              "title": clinic.name,
              "subtitle": clinic.clin_desc,
              "image": {
                "src": {
                  "rawUrl": "https://example.com/images/logo.png"
                }
              },
              "actionLink": `https://example.com/${clinic.id}`
            }))
          ]
        };
        
        console.log(payloadData)
    
        // Send the payload as a response
        agent.add(new diff.Payload(agent.UNSPECIFIED, payloadData, { sendAsMessage: true, rawPayload: true }));
      } catch (error) {
        console.log(error);
      }
    }
    else if (choice == "Hospital"){
      try {
        const hospitals = await fetchHospitals(location);
        console.log(hospitals);
    
        // Create a rich content payload with the retrieved doctor information
        const payloadData = {
          "richContent": [
            hospitals.map(hospital => ({
              "type": "info",
              "title": hospital.name,
              "subtitle": hospital.hosp_desc,
              "image": {
                "src": {
                  "rawUrl": "https://example.com/images/logo.png"
                }
              },
              "actionLink": `https://example.com/${hospital.id}`
            }))
          ]
        };
        
        console.log(payloadData)
    
        // Send the payload as a response
        agent.add(new diff.Payload(agent.UNSPECIFIED, payloadData, { sendAsMessage: true, rawPayload: true }));
      } catch (error) {
        console.log(error);
      }
    }
    else if (choice == "Specialist"){
      try {
    
        // Create a rich content payload with the retrieved doctor information
        const payloadData = {
          "richContent": [
            [
              {
                "options": [
                  {
                    "text": "Urologist"
                  },
                  {
                    "text": "Dentist"
                  },                  
                  {
                    "text": "Psychiatrist"
                  },
                  {
                    "text": "Gynecologist"
                  },
                  {
                    "text": "Cardiologist"
                  }
                ],
                "type": "chips"
              }
            ]
          ]
        }
    
        // Send the payload as a response
        agent.add(new diff.Payload(agent.UNSPECIFIED, payloadData, { sendAsMessage: true, rawPayload: true }));
      } catch (error) {
        console.log(error);
      }
    }
  }


  async function Specialist(agent) {
    const location = agent.context.get("awaiting_location").parameters["geo-city"];
    const specialist = agent.context.get("awaiting_specialist").parameters.specialist;
    

    try {
      const doctors = await fetchDoctors(location, specialist);
      console.log(doctors);
  
      // Create a rich content payload with the retrieved doctor information
      const payloadData = {
        "richContent": [
          doctors.map(doctor => ({
            "type": "info",
            "title": doctor.doc_name,
            "subtitle": doctor.doc_desc,
            "image": {
              "src": {
                "rawUrl": "https://example.com/images/logo.png"
              }
            },
            "actionLink": `https://example.com/${doctor.id}`
          }))
        ]
      };
      
      console.log(payloadData)
  
      // Send the payload as a response
      agent.add(new diff.Payload(agent.UNSPECIFIED, payloadData, { sendAsMessage: true, rawPayload: true }));
    } catch (error) {
      console.log(error);
    } 
  
  }


  async function viewAppointment(agent) {
    const id  = agent.context.get("awaiting_appointid").parameters.number;
    
    try {
      const appoint = await fetchAppointment(id);
      console.log(appoint);
  
      // Send the payload as a response
      agent.add(`Your Appoint ID ${appoint[0].id} is Booked at ${appoint[0].appoint_time} on ${appoint[0].appoint_date}. Your Registered Mobile Number is ${appoint[0].ph_number}`)
    } catch (error) {
      console.log(error);
    }
  }


  // async function fetchSpecialist(location, specialist) {
  //   return new Promise((resolve, reject) => {
  //     const sql = `SELECT id, doc_name, doc_desc FROM doctor WHERE location = '${location}' AND doc_desc = '${specialist}'`;
      
  //     db.query(sql, (err, data) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(data);
  //       }
  //     });
  //   });
  // }
  
  
  async function fetchDoctors(location) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT id, doc_name, doc_desc FROM doctor WHERE location = '${location}'`;
      
      db.query(sql, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  async function fetchClinics(location) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT id, name, clin_desc FROM clinic WHERE location = '${location}'`;
      
      db.query(sql, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  async function fetchHospitals(location) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT id, name, hosp_desc FROM hospital WHERE location = '${location}'`;
      
      db.query(sql, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  
  

  // async function selectLocation(agent) {
  //   try {
  //     // const locations = await fetchLocationsFromDatabase();
      
  //     // Create a rich content payload with the retrieved locations
  //     const payloadData = {
  //       richContent: [
  //         [
  //           {
  //             "type": "description",
  //             "title": "Select Your Location..."
  //           }
  //         ]
  //       ]
  //     };
  //     // console.log(payloadData)
  
  //     // Send the payload as a response
  //     agent.add(new diff.Payload(agent.UNSPECIFIED, payloadData, { sendAsMessage: true, rawPayload: true }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  
  // async function fetchLocationsFromDatabase() {
  //   return new Promise((resolve, reject) => {
  //     const sql = 'SELECT * FROM locations;'; // Assuming you have a table named "locations" in your database
      
  //     db.query(sql, (err, data) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         const locations = data.map((locationObject) => locationObject.name);
  //         resolve(locations);
  //       }
  //     });
  //   });
  // }
  async function fetchAppointment(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM booking WHERE id = '${id}'`; // Assuming you have a table named "locations" in your database
      
      db.query(sql, (err, data) => {
        if (err) {
          reject(err);
        } else {
          
          resolve(data);
        }
      });
    });
  }
  


  

  var intentMap = new Map();
  intentMap.set("webhookDemo", demo);
  intentMap.set("webhookCustomPayload", webhookCustomPayload);
  // intentMap.set("Appointment Related - Book an Appointment", selectLocation);
  // intentMap.set("finalConfirmation", finalBook);
  // intentMap.set("Book an Appointment",selectLocation)
  intentMap.set("selectChoice",doctorListDoctorChoice)
  intentMap.set("Specialist",Specialist)
  intentMap.set("viewAppointment",viewAppointment)


  // intentMap.set("test", test);


  agent.handleRequest(intentMap);

})
// app.listen(8080, () => {
//   console.log("on port 8080")
// })

module.exports = router;