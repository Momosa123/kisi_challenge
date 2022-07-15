const express = require('express')
const app = express()
const cors = require('cors')
const PORT =  8000
const axios = require('axios')
const bodyParser = require('body-parser')
const sanityClient = require("./client")
app.use(bodyParser.json());
app.use(cors())

const path = require('path');
//Get all the datta from the mediastack API and put them  to the sanity studio
//we fetched the data once so we comment the code for not fetching it again
// axios.get('http://api.mediastack.com/v1/news?access_key=faf51760005ac738971d6003d73e8cfd&countries=nz&categories=general,-business,-sports')
//   .then(response => {
//         const randomArticles = response.data.data;
//         const sanityPosts = randomArticles.map(article =>({
//           _type: 'post',
//           title: article.title,
//           author: article.author,
//           category: article.category,
//           mainImage: article.image,
//           publishedAt: article.published_at,
//           body: article.description
//           }
//         ))
//         for (const post of sanityPosts){
//           sanityClient.create(post)
//         }
//         console.log(sanityPosts.length);
//   }).catch(error => {
//         console.log(error);
//   });

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../blog_front/build')));

app.get('/api', (req, res) => {
   console.log('hoome')
  sanityClient.fetch(
    `*[_type == "post"]`
   
    ).then((data => res.status(200).send(data)))
})

app.get('/:category/:article', (req, res) => {
  const categoryParam = req.params.category
  const articleTitleParam = req.params.article
  
  sanityClient.fetch(
    `*[_type == "post" && category == $categoryParam && title == $articleTitleParam]`,
    { categoryParam: categoryParam,
      articleTitleParam: articleTitleParam}
   
    ).then((data => res.status(200).send(data)))
  // res.status(200).send(post)
//  console.log(post)
})

app.get('/:article', (req, res) => {

  const articleTitleParam = req.params.article
  
  sanityClient.fetch(
    `*[_type == "post" && title == $articleTitleParam]`,
    { articleTitleParam: articleTitleParam}
   
    ).then((data => res.status(200).send(data)))
  // res.status(200).send(post)
//  console.log(post)
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../blog_front/build', 'index.html'));
});

app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Listening on port ${PORT}` );
})