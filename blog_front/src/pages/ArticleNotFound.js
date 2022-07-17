import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom'
// import useHistory here.

export default function ArticleNotFound(){

  // get the history object from useHistory()
  const navigate = useNavigate()
  const goBack = () => {
    // Go back!
    navigate('/')
  }
  
  return (
    <main className="postPage">
      <h3>404: Article not found</h3>
      <p>Sorry, but the article you are looking for was not found!</p>

      <iframe title='lost' src="https://giphy.com/embed/3o7aCTPPm4OHfRLSH6" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      <p><a href="https://giphy.com/gifs/reaction-3o7aCTPPm4OHfRLSH6">via GIPHY</a></p>

     
      <div className="actions-container">
        <button className="button" onClick={goBack}>
          Go Back
        </button>
      </div>
    </main>
  );
};

