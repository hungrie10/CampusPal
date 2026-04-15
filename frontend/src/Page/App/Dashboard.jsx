import React from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeUser } from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { faVoicemail } from "@fortawesome/free-solid-svg-icons";
import { faWalkieTalkie } from "@fortawesome/free-solid-svg-icons";
import hero from "../../assets/hero.png";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import slides from "./msg";
import data from "./index";

function Dashboard() {
  const my_slide = useRef(null);
  let [dt, setDt] = useState(data);

  const [currentSlide, setCurrentSlide] = useState(1);

  function change_slide(slideNumber) {
    setCurrentSlide(slideNumber);
  }

  function render_new_msg() {
    const slide = slides[currentSlide - 1];

    return (
      <div id="inner_banner">
        <div id="banner_description">
          <h2>{slide.title}</h2>
          <p>{slide.text}</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === slides.length) return 1;
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <main id="dashboard_page">
      <Header />

      {/* Dashboard Title */}
      <section id="title">
        <div id="title_name">
          <h2>Dashboard</h2>
        </div>

        <div id="title_filter">
          <span
            className={`first_slide ${currentSlide === 1 ? "focus" : ""}`}
            onClick={() => change_slide(1)}
          ></span>

          <span
            className={`second_slide ${currentSlide === 2 ? "focus" : ""}`}
            onClick={() => change_slide(2)}
          ></span>

          <span
            className={`third_slide ${currentSlide === 3 ? "focus" : ""}`}
            onClick={() => change_slide(3)}
          ></span>
        </div>
      </section>

      {/* Our Banner for Campus Pal */}
      <section id="banner">
        <img src={hero} alt="" />
        {render_new_msg()}
      </section>

      <section id="about_campus_pal">
        <h2>About Campus Pal</h2>
        <p>
          Campus Pal is a revolutionary platform designed to enhance the student
          experience on college campuses.{" "}
        </p>
      </section>

      <section id="extList">
        {dt.map((i) => {
          let { name, description, isActive, logo, id } = i;

          return (
            <div className="extensions">
              <div className="extDets">
                <div className="extLogo">

                  <div className="extInfo">
                    <h1>{name}</h1>
                    <p>{description}</p>
                  </div>
                </div>
                
                <br />

                <div className="extControls">
                  <button className="remove">Remove</button>
                  {/* <button className="remove">Remove</button> */}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <Footer />
    </main>
  );
}

export default Dashboard;
