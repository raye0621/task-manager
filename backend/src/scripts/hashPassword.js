// scripts/hashPassword.ts
// import bcrypt from 'bcryptjs';
const bcrypt = require('bcryptjs'); // <<< 改成 require，不是 import！

const password = 'test1234';
bcrypt.hash(password, 10).then((hash) => {
  console.log('加密後的密碼：', hash);
});
