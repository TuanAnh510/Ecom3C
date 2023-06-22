import React, { useState, useEffect } from "react";
import "../home/recent/recent.css";
import "./contentsBlog.css";
import Side from "../blog/Side";
import { contentBlog } from "../data/Data";
import { Link, useParams } from "react-router-dom";
import Comment from "./Comment";
import axios from "axios";
import {
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa";
import VideoBlog from "./videoBlog";
import ShowFeedBackBlog from "./ShowFeedBackBlog";
import imgerror from "../images/imgerror.png";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import LoadingPage from "../loadingPage/LoadingPage";

const ContentsBlog = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());

  useEffect(() => {
    const calldata = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}blog/blogpage?slugs=${id}`)
        .then((response) => {
          const blog = response.data;
          setData(blog[0]);
          setEditorContent(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(blog[0].description))
            )
          );
        });
    };
    calldata();
  }, [id]);

  return data.length != 0 ? (
    <>
      <div>
        <main>
          <div className="containers">
            <section className="contentsBlog mtop">
              <Link to="/blog">
                <h6 className="contentBlog_h6">NEWS</h6>
              </Link>
              <div className="titleBlog">
                <h1 className="contentBlog_h1">{data.title}</h1>
                <div className="contentBlog_diveder"></div>
                <h6 className="contentBlog_poster">{}</h6>
              </div>
              <div className="contentBlog_video">
                {data.video ? (
                  <VideoBlog idyt={data.video} />
                ) : (
                  <div>
                    {" "}
                    <img
                      src={
                        data.imageThumbnail != undefined
                          ? data.imageThumbnail.secure_url
                          : imgerror
                      }
                      style={{ height: "500px" }}
                      alt=""
                    />
                  </div>
                )}
              </div>
              <div className="contentBlog_span">
                <span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: draftToHtml(
                        convertToRaw(editorContent.getCurrentContent())
                      ),
                    }}
                  ></div>
                </span>
              </div>
              <div className="pt-10 flex justify-center items-center">
                <div className="contentBlog_diveder "></div>
              </div>

              <ShowFeedBackBlog propsblogid={data._id} />
              <Comment blogid={data._id} />
            </section>

            <section className="sideContent">
              <Side />
            </section>
          </div>
        </main>
      </div>
    </>
  ) : (
    <LoadingPage size={32} />
  );
};

export default ContentsBlog;
