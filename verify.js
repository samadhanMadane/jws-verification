const jose = require('node-jose');
const fs = require('fs');

const publicKey = fs.readFileSync("./publickey.txt");

keystore = jose.JWK.createKeyStore();

const signedPayloadToVerify = {
  payload: 'eyJtZXRhZGF0YSI6eyJ2ZXJzaW9uIjoiMS4wIiwidGltZXN0YW1wIjoiMjAxOC0xMi0wNlQxMTozOTo1Ny4xNTNaIiwidHJhY2VJZCI6ImU4Y2M2ODIyYmQ0YmJiNGViMWI5ZTFiNDk5NmZiZmY4YWNiIiwib3JnSWQiOiJMU1AxMjMifSwicmVxdWVzdElkIjoiZThjYzY4MjJiZDRiYmI0ZWIxYjllMWI0OTk2ZmJmZjhhY2IiLCJsb2FuQXBwbGljYXRpb25JZHMiOlsiZThjYzY4MjJiZDRiYmI0ZWIxYjllMWI0OTk2ZmJmZjhhY2IiXSwiY3JlZEJsb2NrIjp7InR5cGUiOiJPVFAiLCJkYXRhIjp7ImFwcFRva2VuIjoiMGFCQ0Q3RE1yN3MifX19',
  protected: 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImQ5MDY1NTIwLWRhNDctMTFlYi04ZDE5LTAyNDJhYzEzMDAwMyJ9',
  signature: 'C7VLXcn-y9cPgtlqOUL4F3h3wWlKeVTOx_uwf9z0WzFpPOXwy8NLEQUeN3jQLLZ5ed-V2IxOKeL2ttM5Lb2-xBPdcxlNB0dKfDGAsgXXM0wl6EMBk8QZHbtBoL9DaIvG5eZpY_p6R92OJcIWxCbeH_m3l2PZfGz2ydyU3ax-FZN8TBFKUr5H3QJ0w0XMEa4Os5ZfPuCIKrK-Eqx4PqmS8dg-R3zbdpZlZOuwx69-s3hU-lkek6zMdV2BIcz1EHaKx-1aiRdILNcZeqnxIkQoiZuTpcznZx7SBd5R9yfcRtRoKf9uTSbbNo9_1qLX3EY7asImo8jHes4QLNiexTkLcw'
}

// verify wih public key
keystore.add(publicKey, "pem", {alg : 'RS512', kid : "d9065520-da47-11eb-8d19-0242ac130003"}).
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
