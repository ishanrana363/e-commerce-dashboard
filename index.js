const app = require('./app');

require("dotenv").config();

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`Server run successfully at http://localhost:${port} `)
})