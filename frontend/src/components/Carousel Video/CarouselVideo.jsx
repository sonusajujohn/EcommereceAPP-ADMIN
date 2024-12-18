import React from "react";
import "./CarouselVideo.css";
import { assets, videos } from "../../assets/assets"; // Import the videos object

const CarouselVideo = () => {
  const videoList = [
    { src: videos.video1, title: "Casual Wears" },
    { src: videos.video2, title: "Comfort Fits" },
    { src: videos.video3, title: "Running Shoes" },
    { src: videos.video4, title: "Sports Wear" },
    { src: videos.video5, title: "New Arrivals" },
    { src: videos.video6, title: "New Arrivals" },
  ];

//   const newvideoList = [
//     { src: videos.video5, title: "New Arrivals" },
//     { src: videos.video6, title: "New Arrivals" },
//     { src: videos.video7, title: "New Arrivals" },
//   ];

  return (
    <div className="video-grid">
      {videoList.map((video, index) => (
        <div key={index} className="video-thumbnail">
          <video
            src={video.src}
            autoPlay
            loop
            muted
            className="video-player"
            title={video.title}
          />
          <p className="video-title">{video.title}</p>
        </div>
      ))}

      <div className="shoemiddle">
        <div className="shoebanner">
            <img src={assets.banner2} alt="men img" />
        </div>
        <div className="shoebanner">
            <img src={assets.banner3} alt="women img" />
        </div>
      </div>

      {/* <div className="video-grid">
      {newvideoList.map((video, index) => (
        <div key={index} className="video-thumbnail">
          <video
            src={video.src}
            autoPlay
            loop
            muted
            className="video-player"
            title={video.title}
          />
          <p className="video-title">{video.title}</p>
        </div>
      ))}
      </div> */}

      
      <div className="imgcontainer">
        <div className="offer-container">
            <p className="offer-text">Flat Discount Upto 50% OFF - Limited Time Offer!</p>
        </div>
            <img
                src={assets.banner1}
                alt="First Carousel"
                className="carousel-image"
            />
        </div>

    </div>

  );
};

export default CarouselVideo;
