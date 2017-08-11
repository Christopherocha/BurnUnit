
module.exports = function(sequelize, DataTypes) {

    var Participant = sequelize.define("Participant", {
    username:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[2]
         }
     }
    
 });



   Participant.associate = function(models) {
    // associate user with roasts they won
    Participant.belongsTo(models.Roast, {
      //as:"roasts",  
      onDelete: "cascade",
      foreignKey: {
        allowNull: false
      }      
    });

    Participant.belongsTo(models.User, {
        onDelete: "cascade",
        foreignKey: {
            allowNull: false
        }         
    })


  };

  return Participant;

};
