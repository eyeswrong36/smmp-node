/* Alphanumeric character to Hex String Converter */
String.prototype.alpToHexStr = function(...append) {
    // Determine if append params is available or undefined
    if (append.length) {
        // Return Buffered(hex) string plus the append params (hex string generated)
        return Buffer.from(this).toString("hex") + Buffer.from(append).toString("hex");
    } else {
        // Return Buffered(hex) string
        return Buffer.from(this).toString("hex");
    }
}

/* Alphanumeric character to Hex Array Decimal Converter */
String.prototype.alpToHexArr = function(...append) {
    // Determine if append params is available or undefined
    if (append.length) {
        // Return the spreaded hex string from Buffer as array plus spreaded append params
        return [...Buffer.from(this), ...append];
    } else {
        // Return the spreaded hex string from Buffer as array
        return [...Buffer.from(this)];
    }
}

/* Numeric character to Hex String Converter */
Number.prototype.numToHexStr = function(...append) {
    // Convert bin|dec|hex to hex string
    let n = this.toString(16);
    // If hex string has zero padding then add zero else return hex string
    let b = Buffer.from(n.length%2 ? 0 + n : n, "hex");
    // Spread the resulting buffer, note: this will automaticaly convert to decimal array
    // Determine if append params is available or undefined
    if (append.length) {
        // Return Buffered(hex) string plus the append params (hex string generated)
        return b.toString("hex") + Buffer.from(append).toString("hex");
    } else {
        // Return Buffered(hex) string
        return b.toString("hex");
    }
}

/* Numeric character to Hex Array Decimal Converter */
Number.prototype.numToHexArr = function(...append) {
    // Convert bin|dec|hex to hex string
    let n = this.toString(16);
    // If hex string has zero padding then add zero else return hex string
    let b = Buffer.from(n.length%2 ? 0 + n : n, "hex");
    // Spread the resulting buffer, note: this will automaticaly convert to decimal array
    // Determine if append params is available or undefined
    if (append.length) {
        // Return the spreaded hex string from Buffer as array plus spreaded append params
        return [...b, ...append];
    } else {
        // Return the spreaded hex string from Buffer as array
        return [...b];
    }
}

/**
 * the parameters (append) will append any value of 1-byte / 1-octet every array value
 */
