// monotonically sequencial number

class SeqNum {
    constructor(start) {
        this.current = start;
    }
    getSeq(cmd) {
        this[++this.current] = { seq: this.current, cmd: cmd, time: Date.now() };
        return this[this.current];
    }
    setSeq(cmd, seq) {
        this.current = seq;
        this[this.current] = { seq: this.current, cmd: cmd, time: Date.now() };
        return this[this.current];
    }
}


module.exports.SeqNum = SeqNum;