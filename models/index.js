//Require all created models
const User = require('./User');
const Home = require('./User');
const Dashboard = require('./User');

User.hasMany(Home, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Home.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Dashboard, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Dashboard.belongsTo(User, {
    foreignKey: 'user_id'
});


module.exports = { User, Home, Dashboard };