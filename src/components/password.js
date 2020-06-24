const AppError = new require('./error');
const bcrypt = require('bcrypt');
class Auth {
  async hashPassword(password) {
    return new Promise((resolve) => {
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          throw new AppError('Can not hash password', 422);
        }
        resolve(hash);
      });
    });
  }
}

module.exports=Auth;