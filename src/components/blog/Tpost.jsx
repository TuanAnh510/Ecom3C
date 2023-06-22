import React, { useState, useEffect } from "react";
import "./Tpost.css";
import axios from "axios";
import imgerror from "../images/imgerror.png";
import { Link } from "react-router-dom";
const Tpost = () => {
  const [data, setData] = useState([]);
  const [dataCate, setDataCate] = useState([]);

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}blog/`).then((response) => {
      const blog = response.data;
      setData(blog);
    });
    axios(`${process.env.REACT_APP_API_URL}blogcategory/`).then((response) => {
      const blogcate = response.data;
      setDataCate(blogcate);
    });
  }, []);

  function categoryPosts(item) {
    const categoryBlog = dataCate.find((category) => category._id === item);
    if (categoryBlog) return categoryBlog.title;
  }

  return (
    <>
      <section className="tpost">
        {data
          .map((val) => {
            return (
              <Link to={`../blogdetail/${val.slug}`}>
                <div className="box flexSB">
                  <div className="img">
                    <img
                      src={
                        val.imageThumbnail
                          ? val.imageThumbnail.secure_url
                          : imgerror
                      }
                      alt=""
                    />
                  </div>
                  <div className="text">
                    <h1 className="title">{val.title.slice(0, 40)}...</h1>
                    {/* <span>a year ago</span> */}
                  </div>
                </div>
              </Link>
            );
          })
          .slice(-5)}
      </section>
    </>
  );
};

export default Tpost;
