const express = require('express')
const app = express()
const cors = require('cors')
const PORT =  8000

app.use(cors())
app.use(express.static('public'));
app.get('/', (req, res) =>{
  res.status(200).sendFile(__dirname + '/public/index.html')
})

app.get('/post/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, '../post.html'))
})

app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Listening on port ${PORT}` );
})