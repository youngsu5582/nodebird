const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize,Sequelize);
db.Hashtag = require('./hashtag')(sequelize,Sequelize);

db.Hashtable = sequelize.define('hashtable');
db.Post.belongsToMany(db.Hashtag,{through:'hashtable'});
db.Hashtag.belongsToMany(db.Post,{through:'hashtable'});

db.Post.belongsTo(db.User);
db.User.hasMany(db.Post);





module.exports = db;