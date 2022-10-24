import ShortUniqueId from 'short-unique-id';
import Redis from '../redis/Redis';
import EncriptarDatos from '../helpers/EncriptarDatos';

export default class Token {
    private uid: ShortUniqueId;
    private encriptador: EncriptarDatos;
    private redis: Redis;
    constructor() {
        this.uid = new ShortUniqueId({ length: 16 });
        this.encriptador = new EncriptarDatos();
        this.redis = new Redis();
    }
    async generarToken(payload: any): Promise<string> {
        const token = this.uid();
        const hash = this.encriptador.encrypt(JSON.stringify(payload), token);
        await this.redis.setKey(token, JSON.stringify(hash));
        return token;
    }
}
