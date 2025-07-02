const express = require('express');
const { connect } = require('./gateway');
const app = express();
const port = 3000;

app.use(express.json());

let contract;

async function setup() {
    contract = await connect();
}

setup();

app.post('/create', async (req, res) => {
    const {
        ID,
        DEALERID,
        MSISDN,
        MPIN,
        BALANCE,
        STATUS,
        TRANSAMOUNT,
        TRANSTYPE,
        REMARKS,
    } = req.body;
    try {
        await contract.submitTransaction(
            'CreateAsset',
            ID,
            DEALERID,
            MSISDN,
            MPIN,
            BALANCE,
            STATUS,
            TRANSAMOUNT,
            TRANSTYPE,
            REMARKS
        );
        res.send(`Created asset ${ID}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/read/:id', async (req, res) => {
    try {
        const result = await contract.evaluateTransaction(
            'ReadAsset',
            req.params.id
        );
        res.send(result.toString());
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/history/:id', async (req, res) => {
    try {
        const result = await contract.evaluateTransaction(
            'GetAssetHistory',
            req.params.id
        );
        res.send(result.toString());
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/update', async (req, res) => {
    const {
        ID,
        DEALERID,
        MSISDN,
        MPIN,
        BALANCE,
        STATUS,
        TRANSAMOUNT,
        TRANSTYPE,
        REMARKS,
    } = req.body;
    try {
        await contract.submitTransaction(
            'UpdateAsset',
            ID,
            DEALERID,
            MSISDN,
            MPIN,
            BALANCE,
            STATUS,
            TRANSAMOUNT,
            TRANSTYPE,
            REMARKS
        );
        res.send(`Updated asset ${ID}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`🚀 API running at http://localhost:${port}`);
});
