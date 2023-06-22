import React, { useState, useEffect } from "react";
import "../home/recent/recent.css";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import LoadingPage from "../loadingPage/LoadingPage";

const RecentCard = ({ dataBlog }) => {
  const [data, setData] = useState([]);
  const [dataCate, setDataCate] = useState([]);
  const [dataFiter, setDataFiter] = useState([]);
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}blog/`).then((response) => {
      const blog = response.data;
      setEditorContent(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(blog[0].description))
        )
      );
      if (blog) setData(blog);
    });
    axios(`${process.env.REACT_APP_API_URL}blogcategory/`).then((response) => {
      const blogcate = response.data;
      if (blogcate) setDataCate(blogcate);
    });

    if (dataBlog == undefined) {
    } else {
      setDataFiter(dataBlog);
    }
  }, [dataBlog]);

  function categoryPosts(item) {
    const categoryBlog = dataCate.find((category) => category._id === item);
    if (categoryBlog) return categoryBlog.title;
  }
  return (
    <>
      {dataCate.length != 0 ? (
        dataFiter.length != 0 ? (
          <div className="content grid3 mtop md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 ">
            {dataBlog.map((val, index) => (
              <Link href={`../blogdetail/${val.slug}`}>
                <div className="recentCard bg-color-card" key={index}>
                  <div className="RecentC_img">
                    <img
                      src={val.imageThumbnail}
                      className="rounded-md"
                      alt=""
                    />
                  </div>
                  <div className="text pt-1">
                    <div className="category flexs rounded-md">
                      <span className="bg-color-basic text-text-color rounded-md p-1">
                        {categoryPosts(val.category)}
                      </span>

                      <span className="bg-color-basic text-text-color rounded-md p-1">
                        {moment(val.createdAt).format("DD-MM-YYYY")}
                      </span>
                    </div>
                    <h4 className="h5_location text-text-color pt-3">
                      {val.title.slice(0, 20)}...
                    </h4>
                    <div className="is-divider "></div>
                    <Link to={`../blogdetail/${val.slug}`}>
                      <span className="p_location text-text-color hover:text-color-title">
                        Xem thêm...
                      </span>
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="content grid3 mtop md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 ">
            {data.map((val, index) => (
              <Link to={`../blogdetail/${val.slug}`}>
                <div className="recentCard bg-color-card" key={index}>
                  <div className="RecentC_img">
                    <img
                      src={val.imageThumbnail.secure_url}
                      className="rounded-md"
                      alt=""
                    />
                  </div>
                  <div className="text pt-1">
                    <div className="category flexs rounded-md">
                      <span className="bg-color-basic text-text-color rounded-md p-1">
                        {categoryPosts(val.category)}
                      </span>

                      <span className="bg-color-basic text-text-color rounded-md p-1">
                        {moment(val.createdAt).format("DD-MM-YYYY")}
                      </span>
                    </div>
                    <h4 className="h5_location text-text-color pt-3">
                      {val.title.slice(0, 20)}...
                    </h4>
                    <div className="is-divider "></div>

                    <span className="p_location text-text-color hover:text-color-title">
                      Xem thêm...
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )
      ) : (
        <LoadingPage size={32} />
      )}
    </>
  );
};

export default RecentCard;
