const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors()); // 모든 출처에서의 요청 허용
app.use(bodyParser.json());

app.post('/api/search', async (req, res) => {
    const { query } = req.body;

    try {
        const response = await axios({
            method: 'post',
            url: 'http://192.168.0.6:9200/quickcatch-broadcast/_search?pretty',
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
    console.log(`Server is running on http://192.168.0.11:${port}`);
});
