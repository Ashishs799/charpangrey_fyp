import React, { useContext } from "react";
import "../styles/Blogs.css";
import { BlogsContext } from "../../contextApi/DummyBlogsContext";

const Blogs = () => {
  const blogPosts = useContext(BlogsContext);
  console.log("Blog Posts\n", blogPosts);
  return (
    <div className="blogs public-m">
      <h2 className="heads">Latest Blog</h2>
      <div className="blog_wrapper">
        {blogPosts &&
          blogPosts.map((blog) => (
            <div className="blog_posts" key={blog.id}>
              <div className="blogs_images">
                <img src={blog.blogImage} alt="" />
              </div>
              <div className="blog_row_2">
                <div className="flex_row blog_author">
                  <span>By {blog.author}</span>
                  <span>{blog.date}</span>
                </div>
                <div className="blog_content">
                  <h2 className="blogs_title">{blog.blogTitle}</h2>
                  <p className="blog_desc">{blog.blogDesc}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
