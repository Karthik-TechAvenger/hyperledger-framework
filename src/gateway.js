const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(
    __dirname,
    '../../test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json'
);
const walletPath = path.resolve(
    __dirname,
    '../../test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp'
);

async function connect() {
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const cert = fs
        .readFileSync(path.join(walletPath, 'signcerts', 'cert.pem'))
        .toString();
    const keyDir = path.join(walletPath, 'keystore');
    const keyFile = fs.readdirSync(keyDir)[0];
    const key = fs.readFileSync(path.join(keyDir, keyFile)).toString();

    const inMemoryWallet = await Wallets.newInMemoryWallet();
    await inMemoryWallet.put('admin', {
        credentials: { certificate: cert, privateKey: key },
        mspId: 'Org1MSP',
        type: 'X.509',
    });

    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet: inMemoryWallet,
        identity: 'admin',
        discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork('mychannel');

    return network.getContract('asset');
}

module.exports = { connect };
