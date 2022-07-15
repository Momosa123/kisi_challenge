
import { Link } from "react-router-dom";

export default function Post({title, author, category, mainImage, body}){


  return(
    <div className="post">
      <img className="mainImage" src={mainImage} alt="" />
      <Link to={`/${category}/${title}`}><h4>{title}</h4></Link>
      {/* <h3>{author}</h3> */}
      {/* <h3>{category}</h3> */}
      
      
      {/* <p>{body}</p> */}
    </div>
  )
}