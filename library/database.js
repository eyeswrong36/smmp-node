const sqlite3 = require("sqlite3").verbose();

let dbase = null;

async function InitDbConn() {

    // if database is active already then close and delete variable
    if (dbase != null) {
        dbase.close();
        dbase = null;
    }
    
    let datenow = new Date(Date.now());
    const dbpath = `./dbase/smppdb-${(datenow.getMonth() + 1).toString().padStart(2, "0")}${datenow.getFullYear()}.db`;

    // return a promise for asycn execution of slqite database
    return new Promise((resolve, reject) => {
        // try to open or create new database
        dbase = new sqlite3.Database(dbpath, (err) => {
            
            if (err) console.log(err);
            else console.log("database connected");

            // populate some table of for the database
            dbase.serialize(() => {
                // attach the database smppdb
                dbase.run("ATTACH DATABASE './dbase/smppdb.db' AS smppdb", (err) => {
                    if (err) console.log(err);
                    else console.log("database attached");
    
                    dbase.run("CREATE TABLE IF NOT EXISTS smppdb.sender (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, sid TEXT UNIQUE, token TEXT, name TEXT)", (err) => {
                        if (err) console.log(err);
                        else console.log("table sender created");
                    });
                });
    
                dbase.run("CREATE TABLE IF NOT EXISTS submit (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, seqnum INTEGER UNIQUE, senid INTEGER, destin TEXT, message TEXT, date DATETIME, status TEXT, msgid TEXT)", (err) => {
                    if (err) console.log(err);
                    else console.log("table submit created");
                });
    
                dbase.run("CREATE TABLE IF NOT EXISTS receipt (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, seqnum INT, senid INT, destin TEXT, message TEXT, date DATETIME, status TEXT)", (err) => {
                    if (err) console.log(err);
                    else console.log("table receipt created");
    
                    resolve();
                });
            });

        });

    });

}

function InsertSender(arg) {

    dbase.run("INSERT INTO smppdb.sender (sid, token, name) VALUES (?, ?, ?)", arg, (err) => {
        if (err) console.log(err);
        else console.log("sender inserted");
    });

}

function GetOneSender(arg) {

    return new Promise((resolve, reject) => {
        dbase.get("SELECT * FROM smppdb.sender WHERE sid = ?", [arg], (err, row) => {
            if (err) reject(err);
            else resolve(row ? row : { id : 1 });
        });
    });

}

function GetAllSender() {

    return new Promise((resolve, reject) => {
        dbase.all("SELECT id, sid, name FROM smppdb.sender WHERE id != 1 ORDER BY id ASC", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows ? rows : { rows : 0 });
        });
    });

}

function InsertSubmit(arg) {

    dbase.run("INSERT INTO submit (seqnum, senid, destin, message, date, status) VALUES (?, ?, ?, ?, ?, ?)", arg, (err) => {
        if (err) console.log(err);
        else console.log("submit inserted");
    });

}

function UpdateSubmit(arg) {

    dbase.run("UPDATE submit SET msgid = ? WHERE seqnum = ?", arg, (err) => {
        if (err) console.log(err);
        else console.log("submit updated");
    });

}

function GetLastSubmit() {

    return new Promise((resolve, reject) => {
        dbase.get("SELECT * FROM submit ORDER BY id DESC LIMIT 1", [], (err, row) => {
            if (err) reject(err);
            else resolve(row ? { id: row.id, seqnum: row.seqnum } : { id: 1, seqnum: 1 });
        });
    });

}

function InsertReceipt(arg) {

    dbase.run("INSERT INTO receipt (seqnum, senid, destin, message, date, status) VALUES (?, ?, ?, ?, ?, ?)", arg, (err) => {
        if (err) console.log(err);
        else console.log("deliver inserted");
    });

}

function CloseDB() {
    dbase.close();
}

module.exports = { InitDbConn, InsertSender, GetOneSender, GetAllSender, InsertSubmit, UpdateSubmit, GetLastSubmit, InsertReceipt, CloseDB };