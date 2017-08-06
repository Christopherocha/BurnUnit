module.exports = function(sequelize, DataTypes) {
 // Add code here to create a Post model
 // This model needs a title, a body, and a category
 // Don't forget to 'return' the post after defining

var Roast = sequelize.define("Roast", {
    roast:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[1]
         }
     },
    winner:{
         type: DataTypes.STRING,
         allowNull: true,
         validate:{
             len:[1]
         }
    },
    post:{
         type: DataTypes.STRING,
         allowNull: true,
         validate:{
             len:[1]
         }
    },
    participants:{
         type: DataTypes.STRING,
         allowNull: true,
         validate:{
             len:[1]
         }
    }

 });

   Roast.associate = function(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);
    Roast.belongsTo(models.User, {
      //as:"roasts",  
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    Roast.hasMany(models.Quote, {
        //as:"quotes",
        onDelete: "CASCADE",
        foreignKey: {
        allowNull: false
      }
    })
  }  

  return Roast;
};