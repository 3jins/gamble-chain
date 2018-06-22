import NodeRSA from 'node-rsa';

const bitLength = 2048;

export default class RSAKey {
    constructor() {
        this.privateKey = new NodeRSA({b: bitLength});
    }

    getPublicKey = () => {
        return this.privateKey.exportKey("pkcs8-public-pem");
    };

    encrypt = (plainText, publicKey) => {
        const tempKey = new NodeRSA();
        tempKey.importKey(publicKey, "pkcs8-public-pem");
        return tempKey.encrypt(plainText, "base64");
    };

    sign = (plainText) => {
        return this.privateKey.encrypt(plainText, "sha256");
    };

    decrypt = (cipherText) => {
        return this.privateKey.decrypt(cipherText, "utf8");
    };
}
