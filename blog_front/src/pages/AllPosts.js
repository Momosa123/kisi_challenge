import { useEffect, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ContactForm from "../components/Email";
import Post from "../components/PostPreview";
import sanityClient from "../client";

export default function AllPosts({ posts, setPosts }) {
  const [filteredPosts, setfilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      console.log("je t'ai eu");
      const data = await sanityClient.fetch(`*[_type == "post"]`);

      setPosts(data.filter(post => post.mainImage != null));
      setfilteredPosts(data.filter(post => post.mainImage != null));
      setLoading(false);
    }
    getPosts();
  }, [setPosts]);
  //  const categories = [...new Set(posts.map((Val) => Val.category))];
  const categories = ["tech", "funding", "FAANG", "innovation"];

  // display posts based on the selected categories
  const postElements = filteredPosts.map((post, i) => (
    <Post
      key={i}
      category={post.category}
      title={post.title}
      mainImage={post.mainImage}
      author={post.author}
      body={post.body}
    />
  ));
  return (
    <>
      <CategoryFilter
        setfilteredPosts={setfilteredPosts}
        filteredPosts={filteredPosts}
        categories={categories}
        setPosts={setPosts}
        posts={posts}
      />
      <div className="grid">{loading ? <h3>Loading...</h3> : postElements}</div>
      {!loading && <ContactForm />}
    </>
  );
}
