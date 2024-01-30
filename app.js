const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(express.static('ruta-de-tus-archivos-estaticos'));


app.get('/',(req,res)=>{
    fs.createReadStream('./index.html').pipe(res)
})

io.on('connection',(socket)=>{
    socket.on('mensaje',(arg)=>{
        io.emit('mensaje-global',arg)
    })
})

server.listen(3000, () => {
   console.log('Servidor escuchando en el puerto 3000');
});
