import express from "express"
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let users = [
    {
        username : "hasnain",
        email : "hasnain@gmail.com"
    },
    {
        username : "jani",
        email : "jani@gmail.com"
    },
]

app.get("/" , (req , res) => {
    res.status(200).send("Successfully Request Hit ")
})

app.get("/user" , (req , res) => {

    res.status(200).send({
        status : "true",
        message : "Welcome User",
        data : users
    })
})

app.post("/user" , (req , res) => {
    console.log(" POST Request  ===> " ,req.body)

    if(req.body){
        users.push(req.body)
    }
    res.status(200).json({
        status : true,
        message : "User Has Added",
        data : users
    })
})

app.put("/user/:username" , (req , res) => {
    const body = req.body;
    const {username} = req.params;
    
    users = users.map((user) => {
        if(user.username == username){
            return user = body
        }
        return user
    })
    
    res.status(200).json({
        status : "true",
        message : "User Has Been Edited",
    })
})

app.delete("/user/:username", (req, res) => {

    const {username} = req.params;

   users = users.filter((user) => user.username != username)

    res.status(200).json({
        status : "true",
        message:"deleted user successfully!"
    })
})

app.listen(5500 , () => {
    console.log("App Is Listening From The Port 5500")
})