const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const { jwtCreds } = require('../../config');

const secretKey = jwtCreds.secretKeyJwt;

const hashPassword = (rawPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(rawPassword, 10, (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

const compareHashPassword = async (rawPassword, hashString) => {
  const result = await bcrypt.compare(rawPassword, hashString);
  return result;
};

const generateToken = ( user) => {
  try {
    const accessToken = sign({ ...user }, secretKey, {
      expiresIn: jwtCreds.sessionTime,
    });
    return accessToken;
  } catch (err) {
    return null;
  }
};

const VerifyToken = (req, securityDefinition, scopes, cb) => {
  try {
    const getAuthError = (msg) => {
      const err = new Error(msg);
      err.statusCode = 401;
      err.code = "AuthorizationError";
      err.message = msg;
      return err;
    };
    const bearer = req?.headers?.authorization?.split(" ");
    if (!bearer) return cb(getAuthError("No Token Found"));
    if (bearer && bearer[0] !== "Bearer") {
      return cb(getAuthError("Token Syntax Error"));
    }
    const accessToken = bearer[1];
    if (!accessToken) {
      return cb(getAuthError("UNAUTHORIZED"));
    }
    verify(accessToken, secretKey);
    return cb();
  } catch (err) {
    console.log(`Error verifying Token: ${err}`);
    throw err;
  }
};

module.exports = {
  hashPassword,
  compareHashPassword,
  generateToken,
  VerifyToken,
};
