import React from "react";
import Article from "../../components/article/Article";
import { bhstandard } from "./imports";
import "./blog.css";

const Blog = () => (
  <div className="dgBlogContainer section__padding" id="blog">
    <div className="dgBlogHeader">
      <h1 className="gradient__text">What do the press say?</h1>
    </div>
    <div className="dgBlog">
      <div className="dgBlogSectionA">
        <Article
          imgUrl={bhstandard}
          date="Sep 16, 2022"
          text="New start up changed the whole tourism industry! - Neuwied Times"
        />
      </div>
      <div className="dgBlogSectionB">
        <Article
          imgUrl={bhstandard}
          date="Sep 16, 2022"
          text="How a concept managed to attract more tourists to support downtown shops - Bad Hönningen Post"
        />
        <Article
          imgUrl={bhstandard}
          date="Sep 16, 2022"
          text="Another crowdfunding campaign for Digital Guide - Rheinbrohl News"
        />
        <Article
          imgUrl={bhstandard}
          date="Sep 16, 2022"
          text="Digital Guide: most popular app in the app store - Ariendorf news"
        />
        <Article
          imgUrl={bhstandard}
          date="Sep 16, 2022"
          text="This App is just amazing! - Anh Tuan"
        />
      </div>
    </div>
  </div>
);

export default Blog;
