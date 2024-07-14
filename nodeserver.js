const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the protobuf
const PROTO_PATH = path.join(__dirname, 'protos', 'service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const proto = grpc.loadPackageDefinition(packageDefinition).myservice;

// Define the server implementation
const myFunction = (call, callback) => {
  console.log(`Received message: ${call.request.message}`);
  callback(null, { response: `Hello ${call.request.message}` });
};

// Create the server
const server = new grpc.Server();
server.addService(proto.MyService.service, { myFunction: myFunction });

// Start the server
const address = '0.0.0.0:50051';
server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server running at ${address}.....`);
  server.start();
});
