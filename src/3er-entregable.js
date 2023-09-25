import express from 'express'

const app = express()

app.get('/', (req,res)=>{
    res.send('probando')
})


app.get('/api', (req,res)=>{
    res.send('probando api')
})

app.listen(8000, ()=>{
    console.log('Escuchando al puerto 8000');
})