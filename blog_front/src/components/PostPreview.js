
import { Link } from "react-router-dom";

export default function PostPreview({title, author, category, mainImage, body}){


  return(
    <div className="post">
      <img className="mainImage" src={mainImage} alt="" />
      <Link className="link" to={`/${category}/${title}`}>
      <h4 className="title">{title}</h4></Link>
    </div>
  )
}