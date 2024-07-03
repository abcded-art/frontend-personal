// const config = {
//     backendAddr: "43.203.249.162",
//     backendPort: "8000",
// };

// const config = {
//     backendAddr: window.env.BACKEND_ADDR,
//     backendPort: window.env.BACKEND_PORT,
// };

// const config = {
//     backendAddr: window.env ? window.env.BACKEND_ADDR : '',
//     backendPort: window.env ? window.env.BACKEND_PORT : '',
// }

const config = {
    backendAddr: window.env ? window.env.BACKEND_ADDR : '',
    backendPort: window.env ? window.env.BACKEND_PORT : '',
    elasticsearchAddr: window.env ? window.env.ELASTICSEARCH_ADDR : '192.168.0.6',
    frontendAddr: window.env ? window.env.FRONTEND_ADDR : '192.168.0.16'
}

console.log("backend Address: ", config.backendAddr);
console.log("backend Port: ", config.backendPort);
console.log("elasticsearch Address: ", config.elasticsearchAddr);
console.log("frontend Port: ", config.frontendAddr);


export default config;