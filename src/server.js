
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require("./middleware/errorHandler")
const corsOptions = require("./config/corsOptions")
const cookieParser = require('cookie-parser');
const verifyJWT = require("./middleware/verifyJWT")
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;


// middlewares

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());


//routes
app.use('/auth',require('./routes/auth'))
app.use('/refresh',require('./routes/refresh'))
app.use('/logout', require('./routes/logout'));
app.use('/register', require('./routes/api/user'));
app.use('/api/unity/lens',require("./routes/unity/lenses"));
app.use(verifyJWT) ////////
app.use('/lens', require('./routes/api/lenses'));






app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));