import React from "react";
import "./article.css";

const Article = ({ imgUrl, date, text }) => (
  <div className="dgContainer">
    <div className="dgImageContainer">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="dgContentContainer ">
      <div>
        <p>{date}</p>
        <h3>{text}</h3>
      </div>
      <p>Read Full Article</p>
    </div>
  </div>
);

export default Article;
