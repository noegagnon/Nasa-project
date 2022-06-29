const http = require('http');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000; //check if port specify, if not, default 8000

const server = http.createServer(app);

async function startServer() {
    await loadPlanetsData(); // waiting for data to be loaded.
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })    
}

startServer();  