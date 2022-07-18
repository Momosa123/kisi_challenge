const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router();
const PORT =  4000
const axios = require('axios')
const nodemailer = require('nodemailer')
// const bodyParser = require('body-parser')
app.use(express.json());
const sanityClient = require("./client")
//html-entities to convert special characters
const entities = require('html-entities')
// app.use(bodyParser.json());
app.use(cors())
app.use("/", router)
//to be removed
// sanityClient.delete({
//   query: `*[_type == "post"]`
// })
// sanityClient.delete({
//   query: `*[_type == "seo"]`
// })
const path = require('path');

//creating dummy categories as the fetch datas have none
const categories =['innovation', 'funding', 'FAANG', 'tech']


//Get all the data from the mediastack API and put them  to the sanity studio
//we fetched the data once so we comment the code for not fetching it again
const url = 'https://techcrunch.com/'
const endpoint = 'wp-json/wp/v2/posts?per_page=25&context=view'

// axios.get(url + endpoint)
//   .then(response => {
//         const randomArticles = response.data;
//         const sanitySeo = randomArticles.map(article =>({
//           _type: 'seo',
//           metaTitle: entities.decode(article.title.rendered),
//           description: article.seoDescription,
//           canonicalUrl: article.canonical_url,
//           openGraphImage: article.jetpack_featured_media_url,
//           openGraphUrl: article.canonical_url
//           }
//         ))

//         const sanityPosts = randomArticles.map(article =>{
//           let randomIndex = Math.floor(Math.random()*4)
//           return {_type: 'post',
//           title: entities.decode(article.title.rendered),
//           author: article.parsely.meta.creator[0],
//           category: categories[randomIndex],
//           mainImage: article.jetpack_featured_media_url,
//           publishedAt: article.parsely.meta.datePublished,
//           body: article.content.rendered}
//           }
//         )
//         for (const post of sanityPosts){
//           sanityClient.create(post)
//         }
//         for (const seo of sanitySeo){
//           sanityClient.create(seo)
//         }
//         console.log(randomArticles[0]);
//   }).catch(error => {
//         console.log(error);
//   });

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../blog_front/build')));


app.get('/api', (req, res) => {
  
  sanityClient.fetch(
    `*[_type == "post"]`
   
    ).then((data => res.status(200).send(data)))
})

//serve the article where the path is /categoryName/articleTitle
app.get('/:category/:article', (req, res) => {
  const categoryParam = req.params.category
  const articleTitleParam = req.params.article
  
  sanityClient.fetch(
    `*[_type == "post" && category == $categoryParam && title == $articleTitleParam]`,
    { categoryParam: categoryParam,
      articleTitleParam: articleTitleParam}
   
    ).then((data => {
      console.log(data)
        data ?
        res.status(200).send(data) : 
        res.json().then((body) => {
          console.log("error fetching category and article")
          throw new Error(body.error)
        })
      }
    )
  )
  // res.status(200).send(post)
//  console.log(post)
})

app.get('/:article', (req, res) => {

const articleTitleParam = req.params.article

      sanityClient.fetch(
        `*[_type == "post" && title == $articleTitleParam]`,
        { articleTitleParam: articleTitleParam}
        
        ).then(data => {
          
            if (data.length == 0) 
            {
            return  res.status(404).send('unknown article')
              }
            else {
              
              return res.status(200).send(data)
            }        
          
          })

    
    }        
  
  )
  
const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
    user: "mouhamadoul.sarr@gmail.com",
    pass: "ddxfhtiamkwkmoyk",
  },
  secure:true,
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});  

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  console.log(email)
  const mail = {
    from: "mouhamadoul.sarr@gmail.com",
    to: email,
    subject: " KISI Form Submission",
    html: `Hello ${name},<br><br>
    Thanks we received your extraordinary message.
            We will get bak to you as soon as possible 🚀🚀🚀 <br><br>
            <h5>From Mouhamadou, Javascript Operations Engineer  at KISI ❤️</h5>
            `,

  };
  contactEmail.sendMail(mail, (error,info) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.status(200).send({message:"Mail sent", message_id: info.messageId})
    }
  });
});
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../blog_front/build', 'index.html'));
});

app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Listening on port ${PORT}` );
})