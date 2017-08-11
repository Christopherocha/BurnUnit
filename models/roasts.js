module.exports = function(sequelize, DataTypes) {
 // Add code here to create a Post model
 // This model needs a title, a body, and a category
 // Don't forget to 'return' the post after defining

var Roast = sequelize.define("Roast", {
    roastee:{
         type: DataTypes.INTEGER,
         allowNull: true,
        //  validate:{
        //     min: 1         
        // }
    },
    winner:{
         type: DataTypes.INTEGER,
         allowNull: true,
        //  validate:{
        //      min: 1  
        //  }
    },
    quote:{
         type: DataTypes.STRING,
         allowNull: true,
        //  validate:{
        //      min: 1
        //  }
    },      
    quoteId:{
         type: DataTypes.INTEGER,
         allowNull: true,
        //  validate:{
        //      min: 1
        //  }
    },
    status:{
      type: DataTypes.STRING,
      defaultValue: "playing"
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

    Roast.hasMany(models.Participant, {
        //as:"quotes",
        onDelete: "CASCADE",
        foreignKey: {
        allowNull: false
      }
    })
  }  

  return Roast;
};