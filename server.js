const express = require('express');
//const cors = require('cors');
const path = require('path');

const app = express();

//app.use(cors());
app.use(express.static(__dirname + '/dist/Empleadisimo'));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/Empleadisimo/index.html'));
});


app.listen(process.env.PORT || 8000);