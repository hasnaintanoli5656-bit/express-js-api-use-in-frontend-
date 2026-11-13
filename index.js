import express from "express"
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const user = []

app.get("/" , (req , res) => {
    res.status(200).send("Successfully Request Hit ")
})

app.get("/user" , (req , res) => {

    if(req.body){
        user.push(req.body)
    }
    res.status(200).send({
        status : true,
        message : "Welcome User",
        data : user
    })
})

app.post("/signup" , (req , res) => {
    console.log(" POST Request  ===> " ,req.body)

    if(req.body){
        user.push(req.body)
    }
    res.status(200).json({
        status : true,
        message : "Welcome User",
        data : user
    })
})

app.put("/edit-user" , (req , res) => {
    console.log(" PUT Request  ===> " ,req.body)
    res.status(200).send("Successfully Edit-User Request Hit ")
})

app.delete("/delete-user" , (req , res) => {
    res.status(200).send("Successfully Delete-User Request Hit ")
})

app.listen(5500 , () => {
    console.log("App Is Listening From The Port 5500")
})