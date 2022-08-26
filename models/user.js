
module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define("user",{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
        password:{
            type:DataTypes.STRING(100),
        },  
        Name:{
            type:DataTypes.STRING(10),
            allowNull : true,
        },
        Email:{
            type:DataTypes.STRING(20),
            allowNull : true,
            unique:true

        },
        mentors:{
            type:DataTypes.STRING(200),
            allowNull:true,
        },
        mentees:{
            type:DataTypes.STRING(200),
            allowNull:true,
        },
        help_count:{
            type:DataTypes.INTEGER,
            defaultValue : 0,
        },
        helped_count:{
            type:DataTypes.INTEGER,
            defaultValue : 0,
        },
        good_comment:{
            type:DataTypes.INTEGER,
            defaultValue : 0,
        },
        bad_comment:{
            type:DataTypes.INTEGER,
            defaultValue : 0,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local',
        },
        
    },{
            timestamps:true,
            paranoid:true,
    });
    return User;
}