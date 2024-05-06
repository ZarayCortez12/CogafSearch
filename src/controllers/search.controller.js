

export const searchOne = async (req, res) => {
    console.log("Esto envio desde el frontend: ", req.body)
    const { palabras } = req.body; // Accede a los datos enviados desde el frontend
    console.log("Usuario enviado desde el frontend:", palabras); // Verifica el contenido del usuario
    try {
        // Dividimos la cadena en dos partes en función de un espacio
        const [tabla1, tabla2] = palabras.split(' ');

        console.log("Entramos al método");
        console.log("Esta es la tabla 1:", tabla1);
        console.log("Esta es la tabla 2:", tabla2);

        res.status(200).json({ tabla1, tabla2 });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
};