import { useEffect, useState } from "react";
import rightArrow from "./right-arrow.png";
import bottomArrow from "./bottom-arrow.png";

export default function CategoryFilter({
  categories,
  posts,
  filteredPosts,
  setfilteredPosts,
}) {
  const [displayCategories, setDisplayCategories] = useState("none");

  const [imageSource, setImageSource] = useState(rightArrow);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = e => {
    const selectedCategory = e.target.value;
    if (selectedCategories.includes(selectedCategory)) {
      setSelectedCategories(
        selectedCategories.filter(category => category !== selectedCategory)
      );
    } else {
      setSelectedCategories(prevCategories => [
        ...prevCategories,
        selectedCategory,
      ]);
    }
  };
  useEffect(() => {
    setfilteredPosts(
      posts.filter(post => selectedCategories.includes(post.category))
    );
  }, [selectedCategories]);

  console.log(selectedCategories);

  const categoryElements = categories.map((category, i) => {
    return (
      <div>
        <input
          key={i}
          onChange={toggleCategory}
          name={category}
          type="checkbox"
          value={category}
          checked={selectedCategories.includes(category)}
        />
        <label htmlFor={category}>{category}</label>
      </div>
    );
  });

  function toggleCategoryFilter() {
    imageSource === rightArrow
      ? setImageSource(bottomArrow)
      : setImageSource(rightArrow);
    displayCategories === "none"
      ? setDisplayCategories("flex")
      : setDisplayCategories("none");
  }

  return (
    <div className="category-filter">
      <div onClick={toggleCategoryFilter} className="category-title">
        <img className="fleche" src={imageSource} alt="" />
        <h5>Select Category</h5>
      </div>
      <div style={{ display: `${displayCategories}` }} className="categories">
        {categoryElements}
      </div>
    </div>
  );
}
