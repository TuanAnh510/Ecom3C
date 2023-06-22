import React, { useState, useEffect } from "react";
import "./side.css";
import Heading from "./Heading";
import Tpost from "./Tpost";
import axios from "axios";

const Side = ({ setDataBlog }) => {
  const [keyWord, setKeyWord] = useState();
  useEffect(() => {
    const callapi = async () => {
      await axios
        .get(`https://ecom-oto.vercel.app/api/blog/search?keyword=${keyWord}`)
        .then((response) => {
          const data = response.data;
        });
    };
    callapi();
  }, [keyWord]);

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="grid-row">
          <Heading title="Tìm kiếm" />
          <section className="subscribe">
            <div className="flex items-center">
              <div>
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="relative">
                    <input
                      type="text"
                      className="pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none bg-color-basic bg-opacity-30  "
                      placeholder="Nhập từ khóa..."
                      onChange={(e) => setKeyWord(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="grid-row">
          <div>
            <Heading title="Bài viết mới" />
            <Tpost />
          </div>
        </div>
      </div>
    </>
  );
};

export default Side;
