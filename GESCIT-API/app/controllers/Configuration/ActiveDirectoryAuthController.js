const ActiveDirectory = require('activedirectory2');

const authMercader = async (username, password) => {
  const config = {
    url: 'LDAP://mercader.com',
    baseDN: 'DC=mercader,DC=com',
    username: `mercader\\${username}`,
    password: password,
    attributes: {
      user: ['cn', 'sn', 'givenname', 'mail', 'memberOf', 'company']
    }
  };

  const ad = new ActiveDirectory(config);

  return new Promise((resolve, reject) => {
    ad.findUser(username, (err, user) => {
      if (err) {
        return reject(err);
      }
      return resolve(user);
    });
  });
};

const authVclientes = async (username, password) => {
  const config = {
    url: 'LDAP://100.100.100.196',
    baseDN: 'DC=clientes,DC=mercader,DC=com',
    username: `vclientes\\${username}`,
    password: password,
    attributes: {
      user: ['cn', 'sn', 'givenname', 'mail', 'memberOf', 'company']
    }
  };

  const ad = new ActiveDirectory(config);

  return new Promise((resolve, reject) => {
    ad.findUser(username, (err, user) => {
      if (err) {
        return reject(err);
      }
      return resolve({ err, user });
    });
  });
};

module.exports = {
  authMercader,
  authVclientes
};
