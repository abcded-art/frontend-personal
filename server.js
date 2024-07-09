//test 주석 추가
const config = require('./src/config.js');

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5005;

app.use(cors()); // 모든 출처에서의 요청 허용
app.use(bodyParser.json());

app.post('/api/search', async (req, res) => {
    const { query } = req.body;

    try {
        const { elasticsearchAddr } = config;
        const response = await axios({
            method: 'post',
            url: `http://${elasticsearchAddr}:9200/quickcatch-broadcast/_search?pretty`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                query: {
                    match: {
                        name: {
                            query,
                            fuzziness: "AUTO",
                        },
                    },
                },
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Failed to fetch data from Elasticsearch", error);
        res.status(500).send("Server Error");
    }
});

app.listen(port, '0.0.0.0', () => {
    const { frontendAddr } = config;
    console.log(`Server is running on http://${frontendAddr}:${port}`);
});