
import { expect, test, it, jest } from '@jest/globals';
import generarTokenController from '../src/generarToken/controller';
import Token from '../src/generarToken/Token';
jest.mock('../src/generarToken/Token');

const mockdata = () => {
  jest.spyOn(Token.prototype, 'generarToken')
    .mockImplementation(() => 
      Promise.resolve("GZoXf20yY2ov8lmR")
    )
}

describe('Generar Token', () => {
  it('Caso de Exito', async () => {
    const payload = {
      email: 'fulano@gmail.com',
      card_number: '4652831160426087',
      cvv: '101',
      expiration_year: '2027',
      expiration_month: '10'
    };
    const event = {
      body: JSON.stringify(payload),
      headers: {
        comercio: 'pk_test_LsRBKejsCOEEWOsw'
      }
    }

    
    mockdata()
    const handler = (error, response) => {
      expect(error).toBeNull();
      expect(response).not.toBeUndefined();
      expect(response.statusCode).toEqual(200);
    }
    await generarTokenController(event, null, handler)
  })

  it('Caso de Error', async () => {
    const payload = {
      email: 'fulano@gmail2.com',
      card_number: '4652831160426087',
      cvv: '101',
      expiration_year: '2027',
      expiration_month: '10'
    };
    const event = {
      body: JSON.stringify(payload),
      headers: {
        comercio: 'pk_test_LsRBKejsCOEEWOsw'
      }
    }
    const expectedError = {
      error: {
        message: 'Error de validacion de Datos',
        details: ['\"email\" solo admite los dominios: [@gmail.com,@hotmail.com,@yahoo.es]']
      }
    }
    const handler = (error, response) => {
      console.log('error', error)
      expect(response).toBeUndefined();
      expect(error).not.toBeUndefined();
      expect(error.statusCode).toEqual(400);
      expect(error.statusCode).toEqual(400);
      expect(error.body).toEqual(JSON.stringify(expectedError));
    }
    await generarTokenController(event, null, handler)
  });
});
