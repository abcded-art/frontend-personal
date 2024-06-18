// const config = {
//     backendAddr: "43.203.249.162",
//     backendPort: "8000",
// };

const config = {
    backendAddr: process.env.REACT_APP_BACKEND_ADDR,
    backendPort: process.env.REACT_APP_BACKEND_PORT,
};

export default config;