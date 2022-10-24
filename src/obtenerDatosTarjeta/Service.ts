import Tarjeta from './Tarjeta';
export const obtenerDatosTarjetaService = async (payload: any) => {
	const tarjeta = new Tarjeta();
	return tarjeta.obtenerDatosTarjeta(payload);
};

export default obtenerDatosTarjetaService;
