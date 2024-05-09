import { createContext } from "react";

export const BlogsContext = createContext();

const BlogsProvider = ({ children }) => {
  const blogPosts = [
    {
      id: 1,
      blogTitle: "10 Tips for Improving Your Productivity",
      blogDesc:
        "Discover 10 actionable tips to boost your productivity and get more done.",
      blogImage:
        "https://plus.unsplash.com/premium_photo-1675810094937-f5a3755e10fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      author: "John Doe",
      date: "2024-02-15",
    },
    {
      id: 2,
      blogTitle: "The Benefits of Meditation",
      blogDesc:
        "Learn about the numerous benefits of incorporating meditation into your daily routine.",
      blogImage:
        "https://images.unsplash.com/photo-1526297293668-36b3f33a373b?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      author: "Jane Smith",
      date: "2024-02-14",
    },
    {
      id: 3,
      blogTitle: "Introduction to Machine Learning",
      blogDesc:
        "Get started with the basics of machine learning and understand its importance in today's world.",
      blogImage:
        "https://images.unsplash.com/photo-1631650669896-65c02cfb3bba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      author: "Alex Johnson",
      date: "2024-02-13",
    },
  ];

  return (
    <BlogsContext.Provider value={blogPosts}>{children}</BlogsContext.Provider>
  );
};

export default BlogsProvider;
