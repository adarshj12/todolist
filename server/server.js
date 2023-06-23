const express = require('express');
const app=express();
const cors=require('cors')
const path = require("path");
const todoRouter = require('./routes/routes');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/api',todoRouter);


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle requests for all other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});


app.listen(3000,()=>{
    console.log(`server started`)
})