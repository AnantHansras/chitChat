
const express = require('express');
const app = express();

const dotenv = require('dotenv')
dotenv.config();

const dbConnect = require('./config/db')
dbConnect();

const cors = require('cors')
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());
//only requests coming from http://localhost:5173 are allowed to access the server's resources
app.use(
	cors({
		origin:"http://localhost:5173",
		credentials:true,
	})
)

const {cloudinaryConnect } = require("./config/clodinary");
// const fileUpload = require("express-fileupload");

// app.use(
// 	fileUpload({
// 		useTempFiles:true,
// 		tempFileDir:"/tmp",
// 	})
// )
cloudinaryConnect();


const userRoutes = require('./Routes/user')
const chatRoutes = require('./Routes/chat')
const msgRoutes = require('./Routes/message')
const passRoutes = require('./Routes/password')
app.use('/user',userRoutes)
app.use('/chat',chatRoutes)
app.use('/message',msgRoutes)
app.use('/password',passRoutes)

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server of chitChat is running....'
	});
});

const port = process.env.PORT;
const server = app.listen(port,console.log("Server is running on port ",port));
const io = require("socket.io")(server,{
	cors: {
		origin:"http://localhost:5173",
	},
	pingTimeout : 60000
})

io.on("connection", (socket) => {
    //  console.log("New client connected");

    socket.on("setup", (user) => {
        if (!user || !user._id) return console.error("Invalid user");
        socket.join(user._id);
        //  console.log(`User ${user._id} joined their private room`);
        socket.emit("user connected");
    });

    socket.on("chat access", (room) => {
        socket.join(room);
        io.emit("refresh2");
        // setTimeout(() => {
		// 	// console.log("Sending refresh event to all clients in the room");
		// 	io.emit("refresh"); // Emit globally for testing
		// }, 1000); 
        //  console.log(`User joined chat room: ${room}`);
    });

    socket.on("newMessage", () => {
        
        setTimeout(() => {
			//  console.log("Sending refresh event to all clients in the room");
			io.emit("refresh"); // Emit globally for testing
		}, 1000); 
    });

    // socket.on("disconnect", () => {
    //     console.log("Client disconnected");
    // });

	
});