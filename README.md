# Hyperledger Fabric – Asset Management System

This project is a blockchain-based asset management system built using **Hyperledger Fabric**. It allows creating, updating, reading, and tracking assets using smart contracts and a REST API.





## Features

- Create and update financial assets
- Read asset details
- View asset transaction history
- REST API connected to Fabric network
- Dockerized REST API





## Technologies Used

- Hyperledger Fabric
- Node.js
- Express.js
- Docker





## Asset Fields

Each asset contains the following data:

- `ID`
- `DEALERID`
- `MSISDN`
- `MPIN`
- `BALANCE`
- `STATUS`
- `TRANSAMOUNT`
- `TRANSTYPE`
- `REMARKS`




## Project Steps


### Level 1: Fabric Test Network Setup
    Followed the documentation to set up the Hyperledger fabric network.

    Cloned the `fabric-samples` repository.

    

### Level 2: Smart Contract Deployment


    Wrote smart contract in asset-transfer-basic/chaincode-javascript/assetTransfer.js
    

    Deployed using:
       ./network.sh deployCC -ccn asset -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript

       
    Invoked chaincode:
       peer chaincode invoke ... -c '{"function":"CreateAsset","Args":["asset1", "D001", ...]}'


       
### Level 3: REST API Development + Docker


      Developed a REST API using Node.js + Express.

      
      
      Connected the API to Fabric using fabric-network SDK.
      

      
      Built a Docker image for the API.
      

 ### Build Docker image:
 
    docker build -t fabric-rest-api .     



### Run the container:

    docker run -d \
      -p 3000:3000 \
      -v ~/fabric-samples/test-network:/app/test-network \
      --name fabric-rest-api \
      fabric-rest-api

      
### REST API Endpoints

 POST	/create	Create a new asset
 GET	/read/:id	Read an asset by ID
 PUT	/update/:id	Update an asset by ID
 GET	/history/:id	View asset history

### Example:

curl http://localhost:3000/read/asset1   


### 📂 Project Structure

fabric-samples/

└── asset-transfer-basic/

    ├── chaincode-javascript/
    
    ├── test-network/
    
    └── application-gateway-javascript/
    
        ├── src/
        
        ├── Dockerfile
        
        └── package.json

  ### Challenges Faced
  
     - I was not able to create Rest API in Level 3
     
     - The endpoints like create,update were not configured properly.
     
     - Ended up fixing the error and developing a robust REST API.

 ### Author

 Karthik Kulkarni
 
 Smart Falcon - Hyperledger Fabric Blockchain Project
