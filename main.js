
const express = require("express");
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const cron = require('node-cron');
const SMPP = require("./smpp");
const config = require("./config.json");
const PORT = config.eport;
const { InitDbConn, GetOneSender, GetAllSender, InsertSubmit, UpdateSubmit, InsertReceipt, InsertSender, CloseDB } = require("./library/database");

// InsertSubmit([seqnum, senid, destin, message, date, status, msgid])
// InsertReceipt([seqnum, senid, destin, message, date, status]);

(async () => {

    // init the database
    await InitDbConn();

    let smpp = new SMPP(config.production, (e) => {
        console.log("CONNECTED : ", e);
    });

    // scheduler for database initialiation
    cron.schedule("5 0 0 1 * *", async () => {
        // init the database
        await InitDbConn();
        // release first the connection
        if (!smpp.client.destroyed) {
            smpp.release();
        }
    });

/*     setTimeout(async () => {
        await InitDbConn();
        // release first the connection
        if (!smpp.client.destroyed) {
            smpp.release();
        }
    }, 15000); */
    
    smpp.on("binded", (c) => {
        console.log("BINDED : ", c);
    });

    smpp.on("unbinded", (h) => {
        console.log("UNBINDED : ", h);
    });

    smpp.on("submit", async (c) => {
        console.log("SUBMIT : ", c);
        let senid = await GetOneSender(c.source_addr);
        let data = [
            c.sequence_number,
            senid.id,
            c.destination_addr,
            c.short_message,
            Date.now(),
            c.command_status
        ];
        InsertSubmit(data);
    });

    smpp.on("submitted", (c) => {
        console.log("SUBMITTED : ", c);
        UpdateSubmit([c[2], c[1]]);
    });

    smpp.on("delivered", async (d) => {
        console.log("DELIVERED : ", d);
        let senid = await GetOneSender(d.source_addr);
        let data = [
            d.sequence_number,
            senid.id,
            d.destination_addr,
            d.short_message,
            Date.now(),
            d.command_status
        ];
        InsertReceipt(data);
    });

    smpp.on("generic", (h) => {
        console.log("GENERIC : ", h);
    });

    // get all sender
    app.get("/sender", async (req, res) => {
        // get the user details/credentials
        let users = await GetAllSender();
        res.send(users);
    });
    // insert sender
    app.post("/sender", async (req, res) => {  
        const header = req.headers['authorization'];
        const token = header && header.split(" ")[1];

        // get the user details/credentials
        let user = await GetOneSender("TLCI");

        // basic authorization checking
        if (token == null) {
            return res.sendStatus(401);
        } else if(Buffer.from(token, 'base64').toString("base64").normalize() === user.token.toString().normalize()) {
            // convert user:pass to base64
            let userpasstoken = Buffer.from(`${req.body.user}:${req.body.pass}`).toString("base64");
            // insert user on sender table
            InsertSender([req.body.sender, userpasstoken, req.body.name]);
            res.send({ status: "inserted" });
        } else {
            return res.sendStatus(403);
        }
    });
    
    // login authentication
    app.use(async (req, res, next) => {
        const header = req.headers['authorization'];
        const token = header && header.split(" ")[1];

        // get the user details/credentials
        let user = await GetOneSender(req.body.sender);

        // basic authorization checking
        if (token == null) {
            return res.sendStatus(401);
        } else if(Buffer.from(token, 'base64').toString("base64").normalize() === user.token.toString().normalize()) {
            next();
        } else {
            return res.sendStatus(403);
        }
    });

    // submit endpoints
    app.post("/submit/sm", (req, res) => {
        smpp.submit(req.body);
        res.send({status: "submitted"});
    });

    // request not found
    app.get("/*", (req, res) => {
        res.send("Sorry, this is an invalid URL");
    });

    app.listen(PORT, () => {
        console.log("listnening on port :", PORT);
    });


/*     setInterval(() => {
        smpp.submit({
            sender: "RYAN",
            receiver: "09479757016",
            message: "Hello SMPP" 
        });
        setTimeout(() => {
            smpp.submit({
                sender: "GELLI",
                receiver: "0123456789",
                message: "Hi SMPP"
            });
        }, 2500);
    }, 7500);
     */

})();

