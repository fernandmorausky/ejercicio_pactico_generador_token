import Token from "./Token";

const generarTokenService = async (payload: any): Promise<any> => {
	const token = new Token();
	return token.generarToken(payload);
};

export default generarTokenService;
