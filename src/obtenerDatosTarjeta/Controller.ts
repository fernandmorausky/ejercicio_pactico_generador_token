import obtenerDatosTarjetaService from "./Service";
import obtenerDatosValidacion from "./Validation";

const obtenerDatosTarjetaController = async (event, context, callback) => {
	try {
		const { token, comercio } = event.headers;
		const payload = {
			token,
			comercio
		};
		await obtenerDatosValidacion(payload);
		const result = await obtenerDatosTarjetaService(payload);
		callback(null, {
			statusCode: 200,
			body: JSON.stringify({
				datos: result,
			}),
		});
	} catch (error) {
		callback({
			statusCode: 400,
			body: JSON.stringify({
				error: {
					message: error.message,
					details: error.details,
				}
			}, null)
		});
	}
};

export default obtenerDatosTarjetaController;
