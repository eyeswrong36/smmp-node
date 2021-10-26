
const { SeqNum } = require("./sequence");

let seqES;
let seqMC;

function InitSeqNum(snum) {
    seqES = null;
    seqMC = null;
    seqES = new SeqNum(snum);
    seqMC = new SeqNum(1);
}

function Bind() {
    
    let seqNum = seqES.getSeq("bind_" + this.cid);
    let header = {
        command_id : "bind_" + this.cid,
        sequence_number : seqNum.seq,
        system_id : this.sid,
        password : this.pass
    };
    this[header.command_id](header);

}

function Release() {

    let seqNum = seqES.getSeq("unbind");
    let header = {
        command_id : "unbind",
        sequence_number : seqNum.seq
    };
    this["unbind"](header);

}

async function Submit(arg) {

    // check connection if still active or close then connect if its closed
    await this.connection();

    // for flash message
    arg.flash = arg.flash ? true : false;
    // for international or national number destination
    arg.dest_addr_ton = (arg.receiver[0] == "+") ? 1 : 0;

    console.log("SUBMITTING")
    let seqNum = seqES.getSeq("submit_sm");
    let header = {
        command_id : "submit_sm",
        sequence_number : seqNum.seq,
        source_addr: arg.sender,
        destination_addr: arg.receiver,
        short_message: arg.message,
        data_coding: (arg.flash ? 0xF0 : 0x00),
        dest_addr_ton: arg.dest_addr_ton
    };
    this["submit_sm"](header);

}

function DeliveryResp(arg) {

    let seqNum = seqMC.setSeq("deliver_sm_resp", arg.sequence_number);
    let header = {
        command_id : "deliver_sm_resp",
        sequence_number : seqNum.seq
    };
    this["deliver_sm_resp"](header);

}

function EnquireResp(arg) {

    let seqNum = seqMC.setSeq("enquire_link_resp", arg.sequence_number);
    let header = {
        command_id : "enquire_link_resp",
        sequence_number : seqNum.seq
    };
    this["enquire_link_resp"](header);

}

module.exports = { InitSeqNum, Bind, Release, Submit, DeliveryResp, EnquireResp };