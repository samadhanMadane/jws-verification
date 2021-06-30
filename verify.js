const jose = require('node-jose');
const fs = require('fs');

const penetolabsPublicKey = fs.readFileSync("./publickey.txt");

keystore = jose.JWK.createKeyStore();

const signedPayloadToVerify = {
  payload: 'eyJtZXRhZGF0YSI6eyJ2ZXJzaW9uIjoiMS4wIiwidGltZXN0YW1wIjoiMjAxOC0xMi0wNlQxMTozOTo1Ny4xNTNaIiwidHJhY2VJZCI6ImU4Y2M2ODIyYmQ0YmJiNGViMWI5ZTFiNDk5NmZiZmY4YWNiIiwib3JnSWQiOiJMU1AxMjMifSwicmVxdWVzdElkIjoiZThjYzY4MjJiZDRiYmI0ZWIxYjllMWI0OTk2ZmJmZjhhY2IiLCJsb2FuQXBwbGljYXRpb25JZHMiOlsiZThjYzY4MjJiZDRiYmI0ZWIxYjllMWI0OTk2ZmJmZjhhY2IiXSwiY3JlZEJsb2NrIjp7InR5cGUiOiJPVFAiLCJkYXRhIjp7ImFwcFRva2VuIjoiMGFCQ0Q3RE1yN3MifX19',
  protected: 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImFqZGhjY2UyLTc1MjItNDE0ZC1iZmY3LTZlY2YxMzJkYjM0NSJ9',
  signature: 'XDgJE3HEXLzKA4pzGwzsiTIoP51HsuL34wDYQ6occX6SM3MLSblvxzKxDF_SZSUhQwv6ZjAwFK74eaW6mo0r88KLnt0tLLW9fw0OZeg1PZbeqvxRbd9jwO1kEKbnCh9P33MC_Q05fPa8e385nEWraTyawCXjJqFSLcJf5JbobTyEvktEpP2jqFJ4G6TjV6AYvMmIXFAq2FuLnGAjGRlNNlDdkWkG74c5Qalbu3G2ZBNFcZ1zrEyCfmM7tqt_EAv7BySTQjJEgM6l4q8DhG8h_5rXLOvh9b9GA6F4CjVoZAa4hCBMVCOWwRo9P54t5TZix5KfGaWkHJhw3Ft5qp7XZQ'
}

// verify wih public key
keystore.add(penetolabsPublicKey, "pem", {alg : 'RS512', kid : "ajdhcce2-7522-414d-bff7-6ecf132db345"}).
then(function(result) {
  console.log("result :: ", result);
  console.log("keystore :: ", JSON.stringify(keystore));

  jose.JWS.createVerify(keystore)
  .verify(signedPayloadToVerify)
  .then(function(vRes) {
    console.log("verification result ::", vRes);
  }).catch(function(e) {
    console.log("verification result failed");
    console.log(e);
  });
});
