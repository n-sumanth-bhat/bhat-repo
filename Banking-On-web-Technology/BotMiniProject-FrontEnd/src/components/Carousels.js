import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../images/homepage/BOT1.jpg";
import image2 from "../images/homepage/BOT2.jpg";
import image3 from "../images/homepage/BOT3.jpg";


export default function Carousels() {

  const img = {
    width: 0,
  }

  return (
    <Carousel autoPlay>
      <div style={{ marginTop: '128px' }}>
        <img alt="" src={image1} width="600px" height="400px" />
      </div>
      <div>
        <img alt="" src={image2} width="600px" height="400px" />
      </div>
      <div>
        <img alt="" src={image3} width="600px" height="400px" />
      </div>

    </Carousel>

  )

};
