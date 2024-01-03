const {UserModel} = require("../Models/User.model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const registerUser =  async(req, res) => {
    const {name, email, pass, age} = req.body
    try {
        bcrypt.hash(pass, 5, async (err, secure_password) => {
            if(err){
                console.log(err);
            } else{
                const user = new UserModel({email, pass:secure_password, name, age});
                await user.save();
                res.send("Registered Successfully")
            }
        });
    } catch (error) {
        res.send("Error in registering the User");
        console.log(error);
    }
}


const loginUser =  async (req, res) => {
    const {email, pass} = req.body;
    try {
        const user = await UserModel.find({email});
        console.log(user);
        
            const hashed_pass = user[0].pass;
        if (user.length > 0) {

            bcrypt.compare(pass, hashed_pass, (err, result) => {
                if(result){
                    const token = jwt.sign({ course: 'backend' }, 'masai');
                    res.send({"msg":"successfull", "token": token})
                } else{
                    res.send("Wrong email or password");
                }
            });
            
            
        }else{
            res.send("Wrong email or password");
        }
        
    } catch (error) {
        res.send("Something wnt wrong");
        console.log(error);
    }
}


const deleteUser = async(req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "User deleted Successfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error while deleting user"})
    }
}


module.exports = {
    loginUser, registerUser, deleteUser
}