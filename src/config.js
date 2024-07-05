// const config = {
//     backendAddr: window.env ? window.env.BACKEND_ADDR : '',
//     backendPort: window.env ? window.env.BACKEND_PORT : '',
//     elasticsearchAddr: window.env ? window.env.ELASTICSEARCH_ADDR : '192.168.0.6',
//     frontendAddr: window.env ? window.env.FRONTEND_ADDR : '192.168.0.16'
// }

const config = {
    backendAddr: process.env.BACKEND_ADDR || '',
    backendPort: process.env.BACKEND_PORT || '',
    // elasticsearchAddr: process.env.ELASTICSEARCH_ADDR || '10.0.6.5',
    elasticsearchAddr: process.env.ELASTICSEARCH_ADDR || '192.168.0.6',
    frontendAddr: process.env.FRONTEND_ADDR || '192.168.0.16'
};

console.log("backend Address: ", config.backendAddr);
console.log("backend Port: ", config.backendPort);
console.log("elasticsearch Address: ", config.elasticsearchAddr);
console.log("frontend Port: ", config.frontendAddr);


//export default config;
module.exports = config;