import React from "react";
import { Carousel } from "antd";

import "antd/dist/antd.css";

//images
import BG1 from "../assets/bg1.jpg";
import BG2 from "../assets/bg2.jpg";
import BG3 from "../assets/bg3.jpg";
import BG4 from "../assets/bg4.jpg";
import BG5 from "../assets/bg5.jpg";

import Books from "../components/User/Books";

const Home = () => {
  return (
    <section>
      <Carousel effect="fade" autoplay>
        <center>
          <div>
            <img src={BG1} alt="bg1" />
          </div>
        </center>
        <center>
          <div>
            <img src={BG2} alt="bg2" />
          </div>
        </center>
        <center>
          <div>
            <img src={BG3} alt="bg3" />
          </div>
        </center>
        <center>
          <div>
            <img src={BG4} alt="bg4" />
          </div>
        </center>
        <center>
          <div>
            <img src={BG5} alt="bg5" />
          </div>
        </center>
      </Carousel>
      <Books />
    </section>
  );
};

export default Home;
