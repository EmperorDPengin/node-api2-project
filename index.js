// require your server and launch it here
const server = require('./api/server');

const PORT = 9000;

server.listen(PORT, () => {
    console.log(`Server On Port ${PORT}`);
});

