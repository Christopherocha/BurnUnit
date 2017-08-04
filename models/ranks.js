module.exports = function(sequelize, DataTypes) {
 // Add code here to create a Post model
 // This model needs a title, a body, and a category
 // Don't forget to 'return' the post after defining

 var Rank = sequelize.define("Rank", {
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

//not sure about this association 
//   Rank.associate = function(models) {
//     // Using additional options like CASCADE etc for demonstration
//     // Can also simply do Task.belongsTo(models.User);
//     Rank.belongsTo(models.User, {
//       onDelete: "CASCADE",
//       foreignKey: {
//         allowNull: false
//       }
//     });
//   }  

  return Rank;

};