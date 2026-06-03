require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI no está definido. Crea un .env o exporta la variable.');
  process.exit(1);
}

console.log('Intentando conectar a MongoDB con la URI desde MONGODB_URI...');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
    return mongoose.disconnect();
  })
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error al conectar a MongoDB Atlas:');
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  });
