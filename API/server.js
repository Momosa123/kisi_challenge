const express = require('express')
const app = express()
const cors = require('cors')
const PORT =  8000
const axios = require('axios')
const bodyParser = require('body-parser')
const sanityClient = require("./client")
app.use(bodyParser.json());
app.use(cors())

app.use(express.static('public'));


// axios.get('http://api.mediastack.com/v1/news?access_key=faf51760005ac738971d6003d73e8cfd&countries=nz')
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

app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Listening on port ${PORT}` );
})