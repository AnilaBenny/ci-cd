const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the protobuf
const PROTO_PATH = path.join(__dirname, 'protos', 'service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const proto = grpc.loadPackageDefinition(packageDefinition).myservice;

// Create the client
const client = new proto.MyService('localhost:50051', grpc.credentials.createInsecure());

// Call the service
client.myFunction({ message: 'World' }, (err, response) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Received response: ${response.response}`);
});
