const cn = require('../../libs/database.connect');

module.exports = {
    read: async () => {
        const sql = `SELECT *
        FROM glb_actividades
        ORDER BY id ASC`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

};
