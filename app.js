const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const morgan = require('morgan')
require('dotenv').config();
const ConnectDb = require('./config/MongoConnection')
const path = require('path')
const app = express();
ConnectDb();

const categoryRouter = require('./routers/category')
const subcategoryRouter = require('./routers/subcategory')
const leafcategoryRouter = require('./routers/leafcategory')
const productRouter = require('./routers/product')
const filterRouter = require('./routers/filters')
const authRouter = require('./routers/auth')
const UserRouter = require('./routers/user')
const OrderRouter = require('./routers/order')
const CityRouter = require('./routers/cites')

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/uploads//', express.static(path.join(__dirname, 'uploads')))
app.use('/uploads/', express.static(path.join(__dirname, 'uploads')))

app.get('/', (req, res) => {
    return res.json({ message: 'Hello from node' });
})

app.use('/api', authRouter)
app.use('/api', categoryRouter)
app.use('/api', subcategoryRouter)
app.use('/api', leafcategoryRouter)
app.use('/api', productRouter)
app.use('/api', filterRouter)
app.use('/api', UserRouter)
app.use('/api', OrderRouter)
app.use('/api', CityRouter)

app.use('', (req, res) => {
    res.send('Api Route Not Found !!!')
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));