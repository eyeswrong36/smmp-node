"use strcit";

/**
 * 
 * @param {String} ctrl 
 * @param {Object} head 
 * @param {Array} body 
 */
 module.exports.showTransmitted = function(ctrl, head, body = []) {
    
    return;
    
    let temp = {};
    body.forEach(elem => {
        temp[elem.name] = elem.value;
    });

    let dir = (ctrl == "client" ? "CLIENT >>>> SERVER".bgBlue : "CLIENT <<<< SERVER".bgRed);
    
    console.log(dir, "\nHEAD".underline, head, "\nBODY".underline, temp, "\n" );

}
