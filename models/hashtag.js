module.exports = (sequelize,DataTypes) => {
    const Hashtag = sequelize.define("hashtag",{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
        string:{
            type:DataTypes.STRING(30),
            allowNull:false,

        },
        },{
            timestamps:false,
            paranoid: false,
        });
        return Hashtag;
    }

