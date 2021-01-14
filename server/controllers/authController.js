const bcrypt = require('bcryptjs');

module.exports = {

    register: async (req, res) => {

        const { username, password, isAdmin } = req.body;
        const db = req.app.get('db');

        const result = await db.get_user({ username });

        const existingUser = result[0];

        if (existingUser) {
            return res.status(409).send('Username taken')
        }

    },


    login: (req, res) => {

    },




    logout: (req, res) => {

    }



}