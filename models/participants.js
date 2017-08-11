
module.exports = function(sequelize, DataTypes) {

    var Participant = sequelize.define("Participant", {
    username:{
         type: DataTypes.STRING,
         allowNull: true,
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


  };

  return Participant;

};
