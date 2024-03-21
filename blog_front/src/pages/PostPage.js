import { useParams } from "react-router-dom";
import ContactForm from "../components/Email";

export default function PostPage({ posts }) {
  const { title } = useParams();
  console.log(title);
  const article = posts.find(post => post.title === title);
  function createMarkup() {
    return { __html: article.body };
  }
  return (
    <>
      <div className="postPage">
        <h2>{title}</h2>

        <h5>
          <span className="article-detail">Author: </span>
          {article.author}
        </h5>

        <h5>
          <span className="article-detail">Category: </span>
          {article.category}
        </h5>

        <img className="postImage" src={article.mainImage} alt="" />

        <div className="body" dangerouslySetInnerHTML={createMarkup()}></div>
      </div>
      <ContactForm />
    </>
  );
}
