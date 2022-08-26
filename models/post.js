
module.exports = (sequelize,DataTypes) => {
    const Post = sequelize.define("post",{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
        title : {
            type : DataTypes.STRING(20),
            allowNull :false,
        },
        content : {
            type:DataTypes.TEXT,
            allowNull:false,
        },
        flag : {
            type : DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true,    
        },
        views_count :{
            type : DataTypes.INTEGER,
            defaultValue :0,
        },
        date:{
            type:DataTypes.DATE,
        },
        good:{
            type:DataTypes.INTEGER,
            defaultValue:0,
        },
        bad :{
            type:DataTypes.INTEGER,
            defaultValue:0,
        },
        }
          ,{
            timestamps:true,
            paranoid:true,
    });
    return Post;
}