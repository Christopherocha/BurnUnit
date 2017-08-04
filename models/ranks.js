module.exports = function(sequelize, DataTypes) {
 // Add code here to create a Post model
 // This model needs a title, a body, and a category
 // Don't forget to 'return' the post after defining

 return sequelize.define("ranks", {
    user:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[1]
         }
     },
    numWins:{
         type: DataTypes.INTEGER,
         allowNull: false,
         validate:{
             len:[1]
         }
    }
 });
};