import Buffer from 'Buffer';
import crypto from 'crypto';
import NodeRSA from 'node-rsa';

export default class RSAKey {
    constructor() {
        const key = new NodeRSA();
        key.generateKeyPair(2048, 65537);

        this.publicKey = key.exportKey('pkcs8-public-pem');
        this.privateKey = key.exportKey('pkcs8-private-pem');
    }

    getPublicKey = () => {
        return this.publicKey;
    };

    encrypt = (plainText) => {
        const enc = crypto.publicEncrypt({
            key: this.publicKey,
            padding: crypto.RSA_PKCS1_OAEP_PADDING
        }, Buffer.from(plainText));
        return enc.toString('base64');
    };

    decrypt = (cipherText) => {
        const dec = crypto.privateDecrypt({
            key: this.privateKey,
            padding: crypto.RSA_PKCS1_OAEP_PADDING
        }, Buffer.from(cipherText, 'base64'));
        return dec.toString();
    };

    sign = (plainText) => {
        const sign = crypto.createSign('SHA256');
        sign.update(plainText);
        return sign.sign(this.privateKey, 'hex');
    };

    verify = (signature, plainText, publicKey) => {
        const verify = crypto.createVerify('SHA256');
        verify.update(plainText);
        return verify.verify(publicKey, signature, 'hex');
    }
}
