import SimpleCrypto from "simple-crypto-js";

var _secretKey = process.env.REACT_APP_SECRET_KEY;
var simpleCrypto = new SimpleCrypto(_secretKey);

export default simpleCrypto;