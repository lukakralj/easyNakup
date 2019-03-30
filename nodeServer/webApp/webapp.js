
const express = require('express');


const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log('webapp is running on PORT:',PORT);
});

app.use(express.static(__dirname));
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/table.html');
})


