import Fastify from 'fastify'
const server = Fastify({logger: true})

server.get('/', async (request, reply) => {
    console.log('Recebendo requisição...')
    reply.send('Hello world')}
)

server.get('/json', async (request, reply) => {
    console.log('Recebendo requisição...')
    reply.send({nome: "Isabely"})}
)

server.get('/html', async (request, reply) => {
    console.log('Recebendo requisição...')
    reply.type('text/html').send('<h1>Olá, mundo!</h1>')
})




try {
    console.log('Iniciando o servidor...')
     await server.listen({port: 3000})

}catch (error){
    console.error('Erro ao iniciar o servidor:', error)

} 