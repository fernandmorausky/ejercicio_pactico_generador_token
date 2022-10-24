import crypto, { BinaryLike } from 'crypto';
import { ALGORITMO } from './Constants';

export default class EncriptarDatos {
  private algorithm = ALGORITMO;
  // DOTO leer el secretkey desde un SSM
  private secretKey = process.env.SECRET_KEY;

  encrypt(text: BinaryLike, token: string) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey + token, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex')
    };
  }
  decrypt(hash, token: string) {
    const decipher = crypto
      .createDecipheriv(this.algorithm, this.secretKey + token, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer
      .concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrpyted.toString();
  }
};
