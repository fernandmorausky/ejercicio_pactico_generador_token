import Joi from "joi";
import { COMERCIOS_VALIDOS, DOMINIOS_PERMITIDOS } from "../helpers/Constants";
import validarSchemaError from "../helpers/validarSchemaError";
import ValidarAlgoritmoLuhn from '../helpers/ValidarAlgoritmoLuhn';

const generarTokenValidacion = async (payload) => {
    const validDomains = DOMINIOS_PERMITIDOS
    const validateDomains = (value, helpers) => {
        if (!validDomains.some(domain => value.endsWith(domain))) {
            return helpers.error('domains.invalid');
        }
        return value
    };
    const validateLuhn = (value, helpers) => {
        const validarAlgoritmoLuhn = new ValidarAlgoritmoLuhn()
        const isCardValid = validarAlgoritmoLuhn.validar(value);
        if (!isCardValid) {
            return helpers.error('card.invalid');
        }
        if (value.lengthg < 13 || value.length > 16) {
            return helpers.error('card_length.invalid');
        }
        return value;
    };
    const schema = Joi.object({
        card_number: Joi.number().positive()
            .custom(validateLuhn, 'Luhn validation')
            .required()
            .messages({
                "card.invalid": "{{#label}} No valida",
                "card_length.invalid": "{{#label}} debe estar entre 13 a 16 numeros de longitud",
                "number.base": "{{#label}} debe ser numerico",
                "number.positive": "{{#label}} debe ser positivo",
                "number.unsafe": "{{#label}} debe ser numerico",
                "any.required": "{{#label}} es requerido"
            }),
        cvv: Joi.number()
            .min(100).max(9999)
            .required()
            .messages({
                "number.base": "{{#label}} debe ser numerico",
                "number.min": "{{#label}} debe estar entre 3 a 4 numeros de longitud",
                "number.max": "{{#label}} debe estar entre 3 a 4 numeros de longitud",
                "any.required": "{{#label}} es requerido"
            }),
        expiration_month: Joi.number()
            .min(1).max(12)
            .required()
            .messages({
                "number.base": "{{#label}} debe ser numerico",
                "number.min": "{{#label}} solo admite valores de 1 a 12",
                "number.max": "{{#label}} solo admite valores de 1 a 12",
                "any.required": "{{#label}} es requerido"
            }),
        expiration_year: Joi.number()
            .min(new Date().getFullYear())
            .max((new Date().getFullYear()) + 5)
            .required()
            .messages({
                "number.base": "{{#label}} debe ser numerico",
                "number.min": "{{#label}} puede tomar el año actual hasta máximo 5 años",
                "number.max": "{{#label}} puede tomar el año actual hasta máximo 5 años",
                "any.required": "{{#label}} es requerido"
            }),
        email: Joi.string()
            .email()
            .min(5).max(100)
            .custom(validateDomains, 'custom validation')
            .required()
            .messages({
                "number.base": "{{#label}} debe ser numerico",
                "string.min": "{{#label}} debe estar entre 5 a 100 caracteres de longitud",
                "string.max": "{{#label}} debe estar entre 5 a 100 caracteres de longitud",
                "string.email": "{{#label}} no es un correo valido",
                "domains.invalid": `{{#label}} solo admite los dominios: [${validDomains.toString()}]`,
                "any.required": "{{#label}} es requerido"
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
export default generarTokenValidacion;
