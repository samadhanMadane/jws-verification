const jose = require('node-jose');
const fs = require('fs');

const privateKey = fs.readFileSync("./privatekey.txt");
const publicKey = fs.readFileSync("./publickey.txt");

keystore = jose.JWK.createKeyStore();
keystore.add(publicKey, "pem", {"kid" : "ajdhcce2-7522-414d-bff7-6ecf132db345"});

const jsonToSign = `{"metadata":{"version":"1.0","timestamp":"2018-12-06T11:39:57.153Z","traceId":"e8cc6822bd4bbb4eb1b9e1b4996fbff8acb","orgId":"LSP123"},"requestId":"e8cc6822bd4bbb4eb1b9e1b4996fbff8acb","loanApplicationIds":["e8cc6822bd4bbb4eb1b9e1b4996fbff8acb"],"credBlock":{"type":"OTP","data":{"appToken":"0aBCD7DMr7s"}}}`;

keystore.add(privateKey, "pem", {use : "sig", alg : 'RS512', kid : "ajdhcce2-7522-414d-bff7-6ecf132db345"}).
then(function(result) {
  console.log("pvtKeySign :: ", result);
  jose.JWS.createSign({  format: 'flattened' }, result).
  // update("input", "utf-8").
  update(jsonToSign, "utf-8").
  final().
  then(function(res) {
    console.log("\n signed payload :: ", res);
    jose.JWS.createVerify(keystore).
    verify(res, {
      algorithms: ["RS512"]
    }).
    then(function(vRes) {
      console.log("verification result ::", vRes);
    }).catch(function(e) {
      console.log("verification result failed");
      console.log(e);
    });
  });
});
