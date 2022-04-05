const bcrypt = require('bcryptjs');

module.exports = {
   encrypt: async (password) => {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
   },

   decrypt: async (password, hash) => {
      try {
         const compare = await bcrypt.compare(password, hash);
         return compare;
      } catch (e) {
         console.error(e);
         return false;
      }
   }
}