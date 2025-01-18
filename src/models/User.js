const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: { 
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true,
            validate: {
                notNull: { msg: "Username is required" },
                notEmpty: { msg: "Username cannot be empty" },
            },
        },
        password: { 
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                notNull: { msg: "Password is required" },
                len: { args: [6, 128], msg: "Password must be between 6 and 128 characters" },
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "User",
            validate: {
                isIn: [["Admin", "User"]],
            },
        },
    });

    // Hook to hash password before saving
    User.beforeCreate(async (user) => {
        if(user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    });

    // Method to compare password
    User.prototype.comparePassword = async function (inputPassword) {
        return bcrypt.compare(inputPassword, this.password);
    };

    return User;
};
