import mongoose from 'mongoose';

const url= "mongodb://127.0.0.1:27017/Cyber"

try {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }).then(() =>{
        console.log('¡Conectado a MongoDB!')
    }).catch((error) => {
        console.error('¡Error al conectar a MongoDB!', error)
    });
} catch (error) {
    console.error('¡Error al conectar a MongoDB!', error)
    procces.exit(1)
}

export default mongoose.connection;
