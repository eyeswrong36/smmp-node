# smppexpress
A SMPP Protocol with ExpressJS

# SMPP API Endpoints

  1. Submit SMS to the SMPP Server

    METHOD: POST
    URL: /submit/sm
    HEADER: Authorization: "Basic {encodedusername:password}"
    Request Body: (JSON)
      {
        "sender": "GELLI",
        "receiver": "+639479757016",
        "message": "Hi SMPP Protocol",
        "flash": false
      }
  
    note: sender must belong to the sender database
    
   2. Get all sender on database, sender id 1 is for administrator

    METHOD: GET
    URL: /sender
