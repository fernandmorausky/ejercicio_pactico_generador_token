import Joi from "joi";
import { COMERCIOS_VALIDOS } from "../helpers/Constants";
import validarSchemaError from "../helpers/validarSchemaError";

const obtenerDatosValidacion = async (payload) => {
    const schema = Joi.object({
        token: Joi.string()
            .length(16)
            .required()
            .messages({
                "string.length": "{{#label}} debe tener una longitud de 16 caracteres",
                "any.required": "{{#label}} es requerido",
            }),
        comercio: Joi.string()
            .valid(...COMERCIOS_VALIDOS)
            .required()
            .messages({
                'any.only': 'Campo {{#label}} solo permite {{#valids}}',
                "any.required": "{{#label}} es requerido"
            })
    });
    await validarSchemaError(schema, payload);
};

export default obtenerDatosValidacion;
