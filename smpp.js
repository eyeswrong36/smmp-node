"use strict";

console.clear();
let poun = "#".repeat((process.stdout.columns / 2) - 4);
console.log(poun, "CLIENT", poun, " ");

// setup module for global startup
require("./library/setup");
// Net module for TCP communication using Socket
const Net = require("net");
// require util helper
const util = require('util');
// Require Event module
const Event = require("events");

// require the module from session
const { TimerSession } = require("./library/timer");
const { bind_session, bind_session_resp, manage_session } = require("./library/session");
const { submission, submission_resp, delivery, delivery_resp, anciliary, anciliary_resp } = require("./library/message");
const { pdu_format, command_ids, command_ids_val, command_status, command_status_val } = require("./library/definition");
const { InitSeqNum, Bind, Release, Submit, DeliveryResp, EnquireResp } = require("./library/functions");
const { GetLastSubmit } = require("./library/database");

// function for checking connection
async function Connection() {

    // get the last submit record for sequence number
    this.seqnum = (await GetLastSubmit()).seqnum;
    // Initialize sequence number every reconnection or new connection
    InitSeqNum(this.seqnum);

    return new Promise((resolve, reject) => {
        this.resolvedbind = resolve;
        // check if socket is/still connected
        if (!this.client.pending && this.client.readyState == "open") {
            console.log("ALREADY OPEN");
            this.resolvedbind();
        } else {
            console.log("STILL CLOSE");
            this.client.connect({host: this.host, port: this.port}, () => {
                // resolve bind will not called here,
                // after bind_resp from the server then resolve will be called,
                // see bind_resp for details.
                this.bind();
            });
        }
    });
    
}

function SMPP(arg, cb = null) {
    // remove in production
    this.sender = "client";
    this.receiver = "server";

    //if (arg.auto == undefined) arg.auto = false;
    Object.assign(this, arg);

    // Set the prototype of EventEmmiter to SMPP class
    this.event = new Event.EventEmitter();

    /**
     * TODO
     * 1. Create Socket Connection try to connect to the SMPP host
     * 2a. Bind to the SMPP server (TX, RX, TRX)
     * 2b. Unbind to the SMPP server
     * 3. Submit Short Message / Multiple Short Message
     * 4. Delivery Short Message / Wait for Delivery Report of Short Message
     * 5. Enquire for status of connection, auto reply on enquire_link
     * 6. Generick Nack for acknowledge error of MC to ESME
     */

    // TODO 1. Create Socket Connection try to connect to the SMPP host
    this.client = new Net.Socket();

    this.bind = Bind;
    this.release = Release;
    this.submit = Submit;
    this.deliveryresp = DeliveryResp;
    this.enquireresp = EnquireResp;

    this.connection = Connection;
    this.connection();

    this.client.on("connect", () => {
        if (cb != null) cb(true);
    });

    this.client.on("close", (e) => {
        console.log("CLOSE -: ", e);
        //this.client.unref();
        // destroy connection after socket connection closed
        setTimeout(() => {
            this.client.destroy();
        }, 1000);

        // stop the timer for a while
        timersession.stop();
    });

    this.client.on("error", (err) => {
        if (cb != null) cb(err);
    });

    // timer session
    switch (this.sto[this.sto.length - 1]) {
        case "s" :
            this.sto = parseInt(this.sto) * 1000;
            break;
        case "m" :
            this.sto = parseInt(this.sto) * 1000 * 60;
            break;
        case "h" :
            this.sto = parseInt(this.sto) * 1000 * 60 * 60;
            break;
    }
    const timersession = new TimerSession(() => {
        console.log("UNBINDING : timersession");
        // release the bind on server,
        // note: if there is new incomming submit request, smpp will reconnect automatic
        this.release();
    }, this.sto);

    let notsession = ["unbind", "unbind_resp", "enquire_link", "enquire_link_resp"];
    this.client.on("data", (data) => {
        // get the 2 octet of data to determine the command_ids
        let cmd_id = command_ids_val[data.readUInt32BE(4)];
        // call the function prototype corresponse to the receive data command_ids
        this[cmd_id](data);
        // if condition for timersession
        if (!(notsession.includes(cmd_id))) {
            timersession.reset();
        }
    });

    // TODO 2a. Bind to the SMPP server (TX, RX, TRX)
    this.resolvedbind;
    this.event.on("bind_resp", (head, body) => {
        // the resolvedbind of function Connection will be called here,
        // after bind_resp from the smpp server.
        this.resolvedbind();
        this.emit("binded", head.command_status);
    });

    // TODO 2b. Unbind to the SMPP server
    this.event.on("unbind_resp", (head) => {
        this.emit("unbinded", head.command_status);

        // end socket connection after unbind_resp
        setTimeout(() => {
            this.client.end();
        }, 1000);

    });

    this.event.on("submit_sm", (head, body) => {
        let arg = {...head, ...body};
        let stay = ["sequence_number", "command_status", "short_message", "source_addr", "destination_addr"];
        for (let v in arg) {
            if (!stay.includes(v)) {
                delete arg[v];
            }
        }
        this.emit("submit", arg);
    });

    // TODO 3. Submit Short Message / Multiple Short Message
    this.event.on("submit_sm_resp", (head, body) => {
        this.emit("submitted", [head.command_status, head.sequence_number, body.message_id]);
    });

    // TODO 4. Delivery Short Message / Wait for Delivery Report of Short Message
    this.event.on("delivery", (head, body) => {
        let arg = {...head, ...body};
        let stay = ["sequence_number", "command_status", "sequence_number", "short_message", "source_addr", "destination_addr"];
        for (let v in arg) {
            if (!stay.includes(v)) {
                delete arg[v];
            }
        }
        this.deliveryresp(arg);
        this.emit("delivered", arg);
    });

    // TODO 5. Enquire for status of connection, NOTE: enquire is automatic replied
    this.event.on("enquire_link", (head) => {
        this.enquireresp(head);
    });

    // TODO 6. Generick Nack for acknowledge error of MC to ESME
    // NOTE: generic_nack from ESME to MC will be dev in the future
    this.event.on("generic_nack", (head) => {
        this.emit("generic", head.command_status);
    });

}

// Set the prototype of EventEmmiter to SMPP class
util.inherits(SMPP, Event.EventEmitter);


// create prototype for every command
SMPP.prototype.bind_transmitter = bind_session;
SMPP.prototype.bind_transmitter_resp = bind_session_resp;
SMPP.prototype.bind_receiver = bind_session;
SMPP.prototype.bind_receiver_resp = bind_session_resp;
SMPP.prototype.bind_transceiver = bind_session;
SMPP.prototype.bind_transceiver_resp = bind_session_resp;

SMPP.prototype.unbind = manage_session;
SMPP.prototype.unbind_resp = manage_session;
SMPP.prototype.enquire_link = manage_session;
SMPP.prototype.enquire_link_resp = manage_session;
SMPP.prototype.generic_nack = manage_session;

SMPP.prototype.submit_sm = submission;
SMPP.prototype.submit_sm_resp = submission_resp;
SMPP.prototype.submit_multi = submission;
SMPP.prototype.submit_multi_resp = submission_resp;
SMPP.prototype.deliver_sm = delivery;
SMPP.prototype.deliver_sm_resp = delivery_resp;

SMPP.prototype.cancel_sm = anciliary;
SMPP.prototype.cancel_sm_resp = anciliary_resp;
SMPP.prototype.query_sm = anciliary;
SMPP.prototype.query_sm_resp = anciliary_resp;
SMPP.prototype.replace_sm = anciliary;
SMPP.prototype.replace_sm_resp = anciliary_resp;


module.exports = SMPP;