const processconfig = {
    backendAddr: process.env.BACKEND_ADDR || '',
    elasticsearchAddr: process.env.ELASTICSEARCH_ADDR || '',
    frontendAddr: process.env.FRONTEND_ADDR || ''
};

const config = {
    backendAddr: '',
    elasticsearchAddr: '',
    frontendAddr: ''
};

// 클라이언트 환경에서 window.env 설정
try {
    if (typeof window !== 'undefined') {
        window.env = window.env || {};
        config.backendAddr = window.env.BACKEND_ADDR || processconfig.backendAddr;
        config.elasticsearchAddr = window.env.ELASTICSEARCH_ADDR || processconfig.elasticsearchAddr;
        config.frontendAddr = window.env.FRONTEND_ADDR || processconfig.frontendAddr;
    } else {
        throw new Error('window is undefined');
    }
} catch (error) {
    config.backendAddr = 'https://quickcatch.store';
    config.elasticsearchAddr = '';
    config.frontendAddr = 'https://quickcatch.store';
    console.error('Error reading window.env properties:', error);
}

console.log("Config Backend Address: ", config.backendAddr);
console.log("Config Elasticsearch Address: ", config.elasticsearchAddr);
console.log("Config Frontend Address: ", config.frontendAddr);

console.log("ProcessConfig Backend Address: ", processconfig.backendAddr);
console.log("ProcessConfig Elasticsearch Address: ", processconfig.elasticsearchAddr);
console.log("ProcessConfig Frontend Address: ", processconfig.frontendAddr);

module.exports = { config, processconfig };
