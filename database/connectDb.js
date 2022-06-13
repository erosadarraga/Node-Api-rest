import mongoose from 'mongoose'

try {
    console.log("inicio db");
    await mongoose.connect(process.env.URI_MONGO)
    console.log("Connect DB ok ");
} catch (error) {
    console.log("Error de conexion a mongodb:" + error);
}

