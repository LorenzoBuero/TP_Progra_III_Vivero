import crypto from "crypto";

export function hashearSHA256(stringACifrar) {

    stringACifrar = crypto.createHash('sha256').update(stringACifrar).digest('hex');
    //console.log(stringACifrar);
    return stringACifrar;
}

