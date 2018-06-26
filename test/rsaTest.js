const NodeRSA = require('node-rsa');
const crypto = require('crypto');
const Buffer = require('Buffer');
const key = new NodeRSA();
const message = 'Hello RSA!';

const keyPair = key.generateKeyPair(2048, 65537);
const privateKey = key.exportKey('pkcs8-private-pem');
const publicKey = key.exportKey('pkcs8-public-pem');

// encrypt
const enc = crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.RSA_PKCS1_OAEP_PADDING
}, Buffer.from(message));
const encrypted = enc.toString('base64');
console.log(encrypted);

// decrypt
const dec = crypto.privateDecrypt({
    key: privateKey,
    padding: crypto.RSA_PKCS1_OAEP_PADDING
}, Buffer.from(encrypted, 'base64'));
const decrypted = dec.toString();
console.log(decrypted);

// sign
const sign = crypto.createSign('SHA256');
sign.update(message);
const signature = sign.sign(privateKey, 'hex');
console.log(signature);

// verify
const verify = crypto.createVerify('SHA256');
verify.update(message);
const isVerified = verify.verify(publicKey, signature, 'hex');
console.log(isVerified);
