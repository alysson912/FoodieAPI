//criando server com node 
// import { createServer} from 'node:http'
// const server = createServer((request, response) => {
//     response.write('Hellow World + Swift')
//     return response.end()
// })
// server.listen(3333) // porta da aplicação

// instal primeira dependencia/ framwork - fastify
 
//Criando servidor  com fastify
import { fastify } from "fastify"
//import { DatabaseMemory } from "./database-memory.js" // importando classe 
import { DatabasePostgres } from "./database-postgres.js"


// criando API Rest com Fastify = CRUD DE VIDEOS 
const server = fastify()

//GET - buscar alguma informação 
// POST - Criar um registro 
// PUT - ALTERAÇÃO
// DELETE - Apaga tudo 

//const database = new DatabaseMemory()
const database = new DatabasePostgres()


// Request Body


// criando rota para criar um novo video =  POST: https://localhost:3333/videos

server.post('/videos', async (request, reply) => {
    const { title, description, duration} = request.body
    
   await database.create({
        title,
        description,
        duration,

    })
    return  reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply) => { // no metodo PUT precisamos usar o ID para alterar um  video especifico
    const videoId = request.params.id
    const { title, description, duration} = request.body

  await  database.update(videoId, {
        title,
        description,
        duration,
    })
    return reply.status(204).send() // resposta teve sucesso mas n tem conteudo na resposta 
     
})

server.delete('/videos/:id', async (request, reply) => { // no metodo PUT precisamos usar o ID para apagar um video
    const videoId = request.params.id

   await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,

})