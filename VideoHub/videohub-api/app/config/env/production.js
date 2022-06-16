module.exports = {
    dbUrl : "mongodb://192.168.1.154/videohub",
    sessionSecret : "heregoessecret",
    illegalUsernames: ['user','admin','users','admins'],
    PORT: process.env.NODE_PORT || 3000,
    HOST: process.env.NODE_HOST || 'localhost'
}
