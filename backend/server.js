import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import mentorRouter from './routes/mentorRoute.js';




//App config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB()
connectCloudinary()


// Middleware
app.use(express.json());
app.use(cors());

//API Endpoints
app.use('/api/admin',adminRouter);
//localhost:4000/api/admin/add-doctor
app.use('/api/mentor', mentorRouter);


app.get('/',(req, res)=>{
    res.send('Api Working ')
})

app.listen(PORT, () => console.log("Server Started", PORT));
