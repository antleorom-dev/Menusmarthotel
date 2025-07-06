const Menu = {
    "lunes": "El desayuno constará de buffet libre, para el Almuerzo, visitaremos el Hotel Alfonso XIII, donde le recomendamos alguna carne a la brasa, finalmente, para la cena contaremos con: Ensalada de Queso Brie y Camembert Fritos, con Crujiente de Frutos Secos, Beicon y Vinagreta de Frambuesa.",
    "martes": "El desayuno constará de buffet libre, el almuerzo incluirá: Parrillada de Verduras Tiernas de Temporada con Escamas de Parmesano y, finalmente, la cena constará de un delicioso Tartar de Salmón con Aguacate y Tosta además de Pate de Perdiz sobre Carpaccio de manzana",
    "miércoles": "El desayuno constará de buffet libre, el almuerzo será en el restaurante El Parador, donde le recomendamos algún guiso especial de la zona, y, finalmente, la cena constará de Pierna de Cochinillo Asada, con Patatas Panaderas y Parmentier de Manzana",
    "jueves": "El desayuno constará de buffet libre, el almuerzo consistirá en Habitas con Jamón y Huevo de Codorniz, y , finalmente, la cena consistirá Chuletón de Ternera (500gr) con Pimientos de Padrón Dulces y Patatas Fritas ",
    "viernes": "El desayuno constará de buffet libre.",
    "sábado": "El desayuno constará de buffet libre.",
    "domingo": "El desayuno constará de buffet libre."
};

exports.handler = async function (event) {
    try {
        const requestType = event.request.type;

        if (requestType === "LaunchRequest") {
            return respuestaAlexa("Veo que quieres conocer el menú del Tren Al-Andalus. Puedes preguntarme por el menú correspondiente a cualquier día de la semana.");
        }

        if (requestType === "IntentRequest") {
            const intentName = event.request.intent.name;

            if (intentName === "MenuIntent") {
                const dia = event.request.intent.slots.dia.value.toLowerCase();

                if (Menu[dia]) {
                    return respuestaAlexa(`El menú programado para el ${dia} es: ${Menu[dia]}`);
                } else {
                    return respuestaAlexa(`Lo siento. No hay menú programado para el ${dia}.`);
                }
            }

            if (intentName === "AMAZON.HelpIntent") {
                return respuestaAlexa("Puedes preguntar qué menú hay para un día específico de la semana.");
            }

            if (intentName === "AMAZON.StopIntent" || intentName === "AMAZON.CancelIntent") {
                return respuestaAlexa("¡Gracias y hasta luego!");
            }
        }

        return respuestaAlexa("Lo siento, no entendí tu petición.");
    } catch (error) {
        console.error(error);
        return respuestaAlexa("Ocurrió un error procesando tu solicitud.");
    }
};

function respuestaAlexa(texto) {
    return {
        version: "1.0",
        response: {
            outputSpeech: {
                type: "PlainText",
                text: texto
            },
            shouldEndSession: false
        }
    };
}
