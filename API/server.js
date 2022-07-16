const express = require('express')
const app = express()
const cors = require('cors')
const PORT =  4000
const axios = require('axios')
const bodyParser = require('body-parser')
const sanityClient = require("./client")
//html-entities to convert special characters
const entities = require('html-entities')
app.use(bodyParser.json());
app.use(cors())
//to be removed
sanityClient.delete({
  query: `*[_type == "post"]`
})
sanityClient.delete({
  query: `*[_type == "seo"]`
})
const path = require('path');

//creating dummy categories as the fetch datas have none
const categories =['innovation', 'funding', 'FAANG', 'tech']
let randomIndex = Math.floor(Math.random()*5)

//Get all the datta from the mediastack API and put them  to the sanity studio
//we fetched the data once so we comment the code for not fetching it again
const url = 'https://techcrunch.com/'
const endpoint = 'wp-json/wp/v2/posts?per_page=25&context=view'

axios.get(url + endpoint)
  .then(response => {
        const randomArticles = response.data;
        const sanitySeo = randomArticles.map(article =>({
          _type: 'seo',
          metaTitle: entities.decode(article.title.rendered),
          description: article.seoDescription,
          canonicalUrl: article.canonical_url,
          openGraphImage: article.jetpack_featured_media_url,
          openGraphUrl: article.canonical_url
          }
        ))

        const sanityPosts = randomArticles.map(article =>({
          _type: 'post',
          title: entities.decode(article.title.rendered),
          author: article.parsely.meta.creator[0],
          category: categories[randomIndex],
          mainImage: article.jetpack_featured_media_url,
          publishedAt: article.parsely.meta.datePublished,
          body: article.content.rendered
          }
        ))
        for (const post of sanityPosts){
          sanityClient.create(post)
        }
        for (const seo of sanitySeo){
          sanityClient.create(seo)
        }
        console.log(randomArticles[0]);
  }).catch(error => {
        console.log(error);
  });

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