import joi, { ObjectSchema } from 'joi';
import CustomError from '../exepcions/customError';

const validarSchemaError = async (schema: ObjectSchema, payload) => {
    const result = await schema.validate(payload, {
        allowUnknown: false,
        abortEarly: false
    });
    if (result.error) {
        console.log('result.error', JSON.stringify(result.error, null, 2));
        const errroDetails = result.error.details.map(error => error.message);
        throw new CustomError('Error de validacion de Datos', errroDetails);
    }
}

export default validarSchemaError;
