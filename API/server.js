const express = require('express')
const app = express()
const cors = require('cors')
const PORT =  8000
const axios = require('axios')

app.use(cors())

app.use(express.static('public'));

app.get('/', (req, res) =>{
  res.status(200).sendFile(__dirname + '/public/index.html')
})

axios.get('http://api.mediastack.com/v1/news?access_key=faf51760005ac738971d6003d73e8cfd&countries=nz')
  .then(response => {
        const apiResponse = response.data;
        console.log(apiResponse);
  }).catch(error => {
        console.log(error);
  });

app.get('/post/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, '../post.html'))
})

app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Listening on port ${PORT}` );
})