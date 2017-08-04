module.exports = function(sequelize, DataTypes) {
 // Add code here to create a Post model
 // This model needs a title, a body, and a category
 // Don't forget to 'return' the post after defining

    var User = sequelize.define("User", {
    name:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[1]
         }
     },
    password:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[1]
         }
    },
    image:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[1]
         }
    }

 });

   User.associate = function(models) {
    // associate user with roasts they won
    User.hasMany(models.Roast, {
      onDelete: "cascade"
    });
  };

  return User;

};
