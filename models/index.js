//Require all created models
const User = require('./User');
const Post = require('./Post');
const Home = require('./Home')

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasOne(Home, {
    foreignKey: 'user_id',
})

Home.belongsTo(User, {
    foreignKey: 'user_id'
})


module.exports = { User, Post, Home };