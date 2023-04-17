const crypto = require('crypto');

module.exports = {
    async generateToken() {
        // #swagger.tags = ['Configuración']
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer.toString('hex'));
                }
            });
        });
    }
}