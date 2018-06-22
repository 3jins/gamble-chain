import crypto from 'crypto';

export default class AESKey {
    constructor() {
        this.key = crypto.createHash("sha256").update("sorrow").digest();
        this.iv = crypto.randomBytes(16);
    }

    encrypt = (cryptKey, crpytIv, plainText) => {
        const encipher = crypto.createCipheriv("aes-256-cbc", cryptKey, crpytIv);
        let encrypted = encipher.update(plainText, "utf8", "binary");
        encrypted += encipher.final("binary");

        return new Buffer(encrypted, "binary").toString("base64");
    };

    decrypt = (cryptKey, cryptIv, cipherText) => {
        const encrypted = new Buffer(cipherText, "base64").toString("binary");
        const decipher = crypto.createDecipheriv("aes-256-cbc", cryptKey, cryptIv);
        let decrypted = decipher.update(encrypted, "binary", "utf8");
        decrypted += decipher.final("utf8");

        return decrypted;
    };
}
