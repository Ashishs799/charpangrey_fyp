import React, { useContext } from "react";
import "../styles/Testimonials.css";
import { TestimonialContext } from "../../contextApi/TestimonialContext";
import { IoStar } from "react-icons/io5";

const Testimonials = () => {
  const testimonials = useContext(TestimonialContext);
  return (
    <div className="testimonials_container  public-m">
      <h2 className="heads">What Our Clients Say</h2>
      <div className="testimonials">
        {testimonials.map((testimonial) => (
          <div className="testimonial_box" key={testimonial.id}>
            <div className="testimonials_userprofile">
              <div className="userimg">
                <img src={testimonial.photo} alt="" />
              </div>
              <span>{testimonial.name}</span>
            </div>
            <div className="ratings">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
            </div>
            <div className="testimonial_comments">
              <p>{testimonial.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
