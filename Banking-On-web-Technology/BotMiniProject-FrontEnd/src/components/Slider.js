// import React, { Component } from "react";
// import Slider from "react-slick";
// import image1 from "../images/homepage/BOT1.jpg";
// import image2 from "../images/homepage/BOT2.jpg";
// import image3 from "../images/homepage/BOT3.jpg";


// export default class SimpleSlider extends Component {
//   render() {
//     const settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1
//     };
//     return (
//       <div>
//         <h2> Single Item</h2>
//         <Slider {...settings}>
//         <div style={{marginTop: '128px'}}>
//       <img alt="" src={image1} width="600px" height="400px"/>
//     </div>
//     <div>
//       <img alt="" src={image2} width="600px" height="400px"/>
//     </div>
//     <div>
//       <img alt="" src={image3} width="600px" height="400px"/>
//     </div>
//         </Slider>
//       </div>
//     );
//   }
// }


// import React, { Component } from "react";
// import Slider from "react-slick";

// export default class SimpleSlider extends Component {
//   render() {
//     const settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1
//     };
//     return (
//       <div>
//         <h2> Single Item</h2>
//         <Slider {...settings}>
//           <div>
//             <h3>1</h3>
//           </div>
//           <div>
//             <h3>2</h3>
//           </div>
//           <div>
//             <h3>3</h3>
//           </div>
//           <div>
//             <h3>4</h3>
//           </div>
//           <div>
//             <h3>5</h3>
//           </div>
//           <div>
//             <h3>6</h3>
//           </div>
//         </Slider>
//       </div>
//     );
//   }
// }

// import React from 'react';
// import { Slide } from 'react-slideshow-image';
// import image1 from "../images/homepage/BOT1.jpg";
// import image2 from "../images/homepage/BOT2.jpg";
// import image3 from "../images/homepage/BOT3.jpg";

// const eachSlideDiv = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundSize: "cover",
//     height: "350px",
//   };
  
//   const eachSlideSpan = {
//     padding: "20px",
//     fontSize: "20px",
//     background: "#efefef",
//     textAlign: "center",
//   }


// const slideImages = [
//     { image1 },
//     { image2 },
//     { image3 },
// ];

// const Slideshow = () => {
//     return (
//       <div>
//         <Slide easing="ease">
//           <div>
//             <div  className={eachSlideDiv} style={{'backgroundImage': `url(${slideImages[0]})`}}>
//               <span className={eachSlideSpan} >Slide 1</span>
//             </div>
//           </div>
//           <div className="each-slide">
//             <div   className={eachSlideDiv} style={{'backgroundImage': `url(${slideImages[1]})`}}>
//               <span  className={eachSlideSpan} >Slide 2</span>
//             </div>
//           </div>
//           <div className="each-slide">
//             <div className={eachSlideDiv} style={{'backgroundImage': `url(${slideImages[2]})`}}>
//               <span className={eachSlideSpan}>Slide 3</span>
//             </div>
//           </div>
//         </Slide>
//       </div>
//     )
// };

// export default Slideshow;