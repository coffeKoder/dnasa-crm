const cn = require('../../libs/database.connect');

module.exports = {
    create: async (data) => {
        const user_status = data;
        const sql = `INSERT INTO cfg_user_status(user_status) VALUES ('${user_status.user_status}')`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    read: async () => {
        const sql = `SELECT id, user_status FROM cfg_user_status`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    update: async (data) => {
        const user_status = data;
        const sql = `UPDATE cfg_user_status SET user_status='${user_status.user_status}' WHERE id = ${user_status.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },

    delete: async (data) => {
        const user_status = data;
        const sql = `DELETE FROM cfg_user_status WHERE id = ${user_status.id}`;
        try {
            const results = await cn.query(sql);
            return results;
        } catch (e) {
            return e;
        }
    },
};
