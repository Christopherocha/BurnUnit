
module.exports = function(sequelize, DataTypes) {
 // Add code here to create a Post model
 // This model needs a title, a body, and a category
 // Don't forget to 'return' the post after defining

    var User = sequelize.define("User", {
    name:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[2]
         }
     },
    password:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[8]
         }
    },
    username:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[2]
         }
     }, 
    email:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[2]
         }
     },                 
    image:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
             len:[1]
         }
    },
    rank:{
         type: DataTypes.INTEGER,
         allowNull: true,
         validate:{
             min: 1  
         }
    }        

 },
//check out using bycrypt to make passwords safer
//  {
//     hooks: {
//       beforeCreate: (user) => {
//         const salt = bcrypt.genSaltSync();
//         user.password = bcrypt.hashSync(user.password, salt);
//       }
//     },
//     instanceMethods: {
//       validPassword: function(password) {
//         return bcrypt.compareSync(password, this.password);
//       }
//     }    
// }
);

   User.associate = function(models) {
    // associate user with roasts they won
    User.hasMany(models.Roast, {
      //as:"roasts",  
      onDelete: "cascade",
      foreignKey: {
        allowNull: false
      }      
    });

    User.hasMany(models.Quote, {
        //as:"quotes",
        onDelete:"CASCADE",
      foreignKey: {
        allowNull: false
      }        
    });
  };

  return User;

};
