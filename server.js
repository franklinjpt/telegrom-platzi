const express = require('express');
const response = require('./network/response.js');

// const router = require('./components/messages/network');
const router = require('./network/routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/app', express.static('public'));
// app.use(router);

router(app);
 
/*Tipos de respuesta
res.send();  //vacia
res.status(201).send('Hola ' + req.body.name);  //plana
res.status(201).send({    //Estructurada - array, objetos
        error: '',
        body: 'Creado correctamente'
    });
*/
app.listen(3000);
console.log('App is listening in http://localhost:3000');