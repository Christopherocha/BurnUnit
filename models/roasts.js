module.exports = function(sequelize, DataTypes) {
 // Add code here to create a Post model
 // This model needs a title, a body, and a category
 // Don't forget to 'return' the post after defining

 return sequelize.define("Roast", {
    roast:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[1]
         }
     },
    winner:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[1]
         }
    },
    post:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[1]
         }
    },

 });
};