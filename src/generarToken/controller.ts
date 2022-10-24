import generarTokenService from "./service";
import generarTokenValidacion from "./Validation";

const generarTokenController = async (event, context, callback) => {
	try {
		const body = JSON.parse(event.body);
		const payload = {
			...body,
			comercio: event.headers.comercio
		};
		await generarTokenValidacion(payload);
		const result = await generarTokenService(payload);
		callback(null, {
			statusCode: 200,
			body: JSON.stringify({
				token: result,
			})
		});
	} catch (error) {
		console.log('error', error)
		callback({
			statusCode: 400,
			body: JSON.stringify({
				error: {
					message: error.message,
					details: error.details,
				}
			}, null),
		});
	}
};
export default generarTokenController;
