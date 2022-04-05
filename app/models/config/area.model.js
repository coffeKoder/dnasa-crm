const cn = require('../../libs/database.connect');

module.exports = {

    create: async (data) => {
        const area = data;
        const sql = `INSERT INTO cfg_areas(area, alias) VALUES ('${area.area}', '${area.alias}')`;
        try {
            const results = await cn.query(sql);
            if (results.OkPacket.affectedrows > 0) {
                return results
            }
        } catch (e) {
            return e
        }
    },
    read: async () => {
        const sql = `SELECT id, area, alias FROM cfg_areas `;
        try {
            const results = await cn.query(sql);
            console.log(results);
            return results
        } catch (e) {
            return e;
        }
    },
    filter: async (data) => {
        const sql = `SELECT id, area, alias FROM cfg_areas WHERE id = ${data.id}`;
        try {
            const results = await cn.query(sql);
            return results
        } catch (e) {
            return e;
        }
    },
    update: async (data) => {
        const area = data;
        const sql = `UPDATE cfg_areas SET area='${area.area}',alias='${area.alias}' WHERE id = ${area.id}`;
        try {
            const results = await cn.query(sql);
            return results
        } catch (e) {
            return e;
        }
    },
    delete: async (data) => {
        const area = data;
        const sql = `DELETE FROM cfg_areas WHERE id = ${area.id}`;
        try {
            const results = await cn.query(sql);
            return results
        } catch (e) {
            return e;
        }
    },

}