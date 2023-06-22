import React, { useEffect, useState } from "react";
import axios from "axios";
import Awards from "./awards/Awards";
import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Recent from "./recent/Recent";
import LoadingPage from "../loadingPage/LoadingPage";
const Home = () => {
  const [home, setHome] = useState([]);
  useEffect(() => {
    const getInfoweb = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}home`)
        .then((response) => {
          setHome(response.data);
        });
    };
    getInfoweb();
  }, []);

  return home.length != 0 ? (
    <>
      <Hero
        imgheader={home[0].imgheader.secure_url}
        titleheader={home[0].titleheader}
      />
      <Recent
        titleprodcut1={home[0].titleprodcut1}
        titleprodcut2={home[0].titleprodcut2}
      />
      <Featured />
      <Awards
        titleservice={home[0].titleservice}
        descriptionservice={home[0].descriptionservice}
        imgservice={home[0].imgservice.secure_url}
      />
    </>
  ) : (
    <LoadingPage size={35}/>
  );
};

export default Home;
