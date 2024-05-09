import { createContext } from "react";

export const TestimonialContext = createContext();

const TestimonialContextProvider = ({ children }) => {
  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      review:
        "I had a fantastic experience selling my car through this website. The process was smooth and hassle-free. Highly recommended!",
      photo: "https://source.unsplash.com/random/?person",
    },
    {
      id: 2,
      name: "Emily Johnson",
      review:
        "I found my dream car on this website at a great price. The platform was easy to navigate, and the seller was very helpful. Thank you!",
      photo: "https://source.unsplash.com/random/?person",
    },
    {
      id: 3,
      name: "Michael Davis",
      review:
        "I was skeptical at first, but this website exceeded my expectations. I sold my car within days of listing it. Amazing service!",
      photo: "https://source.unsplash.com/random/?person",
    },
    // {
    //   id: 4,
    //   name: "Sarah Brown",
    //   review:
    //     "As a first-time car buyer, I was nervous, but this website made it easy. Detailed listings helped me find what I needed. The seller was patient and helpful. Thrilled with my new car! Highly recommend.",
    //   photo: "https://source.unsplash.com/random/?person",
    // },
  ];

  return (
    <TestimonialContext.Provider value={testimonials}>
      {children}
    </TestimonialContext.Provider>
  );
};
export default TestimonialContextProvider;
