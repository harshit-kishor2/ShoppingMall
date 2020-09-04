import express from "express";
import config from './config'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoute from "../routes/userRoute";
import productRoute from '../routes/productRoute';
import orderRoute from '../routes/orderRoute';
const mongodbUrl=config.MONGODB_URL
mongoose.connect(
mongodbUrl
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})  
.then(() => console.log('DB Connected.'))
.catch((error) => console.log(error.reason));
const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
})
app.get('/', (req, res) => res.send('Server is ready.'));
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});


app.listen(3003, () => {
  console.log(`Server started on port 3003`);
});