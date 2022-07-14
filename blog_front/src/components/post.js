
export default function Post({title, author, category, mainImage, body}){
  return(
    <article>
      <h2>{title}</h2>
      <h3>{author}</h3>
      <h3>{category}</h3>
      
      <img src={mainImage} alt="" />
      <p>{body}</p>
    </article>
  )
}