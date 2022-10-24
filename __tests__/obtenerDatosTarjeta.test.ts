
import { expect } from '@jest/globals';
import obtenerDatosTarjetaController from '../src/obtenerDatosTarjeta/Controller';
import Tarjeta from '../src/obtenerDatosTarjeta/Tarjeta';
jest.mock('../src/obtenerDatosTarjeta/Tarjeta');

const mockdata = () => {
  jest.spyOn(Tarjeta.prototype, 'obtenerDatosTarjeta')
    .mockImplementation(() => {
      return Promise.resolve({
        email: 'sassasasss@gmail.com',
        card_number: '4551708270813127',
        expiration_year: '2027',
        expiration_month: '10'
      })
    }
    )
}

describe('Obtener Datos tarjeta', () => {
  it('Caso exito', async () => {
    const event = {
      headers: {
        token: 'kadlkshfkshdfhsd',
        comercio: 'pk_test_LsRBKejsCOEEWOsw'
      }
    }
    const handler = (error, response) => {
      expect(error).toBeNull();
      expect(response).not.toBeUndefined();
      expect(response.statusCode).toEqual(200);
    }
    await obtenerDatosTarjetaController(event, null, handler)
  });
  it('Caso Error', async () => {
    const event = {
      headers: {
        token: 'kadlkshfkshdfhsd1',
        comercio: 'pk_test_LsRBKejsCOEEWOsw'
      }
    }
    const handler = (error, response) => {
      const expectedError = {
        error: {
          message: 'Error de validacion de Datos',
          details: ['\"token\" debe tener una longitud de 16 caracteres']
        }
      }
      expect(response).toBeUndefined();
      expect(error).not.toBeUndefined();
      expect(error.statusCode).toEqual(400);
      expect(error.body).toEqual(JSON.stringify(expectedError));
    }
    await obtenerDatosTarjetaController(event, null, handler)
  });
});