module.exports = function(sequelize, DataTypes) {
 // Add code here to create a Post model
 // This model needs a title, a body, and a category
 // Don't forget to 'return' the post after defining

var Quote = sequelize.define("Quote", {
    quote:{
         type: DataTypes.STRING,
         allowNull: true,
         validate:{
             len:[1]
         }
    }

 });

   Quote.associate = function(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);

    Quote.belongsTo(models.Roast, {
      //as:"roastQuotes",
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    Quote.belongsTo(models.User, {
      //as: "userQuotes",
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }  

  return Quote;
};