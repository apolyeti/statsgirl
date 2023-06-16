const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/mtstats', async (req, res) => {
    try {
        const response = await axios.get('https://api.monkeytype.com/users/:apol/profile', {
            headers: {
                Authorization: 'ApeKey ' + process.env.APE_KEY,
            },
        });
        const statsData = response.data;
        res.json(statsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching MonkeyType stats' });
    }
});

app.listen(port, () => {
    console.log(`statsgirl server is running on port ${port}`);
});