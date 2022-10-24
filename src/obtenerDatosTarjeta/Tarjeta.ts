import ObjectMapper from 'object-mapper';
import Redis from '../redis/Redis';
import EncriptarDatos from '../helpers/EncriptarDatos';
import mapperResponse from './tarjeta.response.mapper';
import CustomError from '../exepcions/customError';
export default class Tarjeta {
    private encriptador: EncriptarDatos;
    private redis: Redis;
    constructor() {
        this.encriptador = new EncriptarDatos();
        this.redis = new Redis();
    }
    async obtenerDatosTarjeta(payload): Promise<any> {
        const { token } = payload;
        let hash = await this.redis.getKey(token);
        if (!hash || hash.length === 0) {
            throw new CustomError('Datos de tarjeta no encontrado o token vencido.');
        }
        hash = JSON.parse(hash);
        const dataTarjeta = this.encriptador.decrypt(hash, token);
        if (!dataTarjeta || dataTarjeta.length === 0) {
            throw new CustomError('Datos de tarjeta no encontrado.');
        }
        return ObjectMapper(JSON.parse(dataTarjeta), mapperResponse);
    }
}
