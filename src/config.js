// const config = {
//     backendAddr: "43.203.249.162",
//     backendPort: "8000",
// };

// const config = {
//     backendAddr: window.env.BACKEND_ADDR,
//     backendPort: window.env.BACKEND_PORT,
// };

const config = {
    backendAddr: window.env ? window.env.BACKEND_ADDR : '',
    backendPort: window.env ? window.env.BACKEND_PORT : '',
}

console.log("Backend Address: ", config.backendAddr);
console.log("Backend Port: ", config.backendPort);

export default config;