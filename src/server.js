
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require("./middleware/errorHandler")
const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 3500;
const cookieParser = require('cookie-parser');

// middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(logger);
app.use(cors(corsOptions))
app.use(errorHandler)
app.use(cookieParser());


//routes
app.use('/lens', require('./routes/api/lenses'));
app.use('/register', require('./routes/api/user'));
app.use('/auth',require('./routes/auth'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));