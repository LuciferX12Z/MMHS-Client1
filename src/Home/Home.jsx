import React from "react";
import classes from "./Home.module.css";
import dummyImage from "../dummyImages/dummyBackground.png";

export const Home = () => {
  return (
    <div>
      <div className={classes.img}>
        <img src={dummyImage} className={classes.image} />
      </div>
      <div className={classes.body}>
        <div className={classes.toptext}>
          <img src={dummyImage} className={classes.rimage} />
          <div className={classes.text1}>
            <h4>Mission statement</h4>
            To provide hospitality programmed that are in high demand by
            students and produce graduates that are in high demand by the
            hospitality industry in Myanmar and in the Asia-Pacific region.
            <br />
            <h4>Vision statement</h4>
            To become the leading provider of internationally recognized
            hospitality programmed in Myanmar.
            <br />
          </div>
          <div className={classes.text2}>
            <h4>Background to the business</h4>
            <p>
              Formed in 2019, the (MMHS) Myanmar Mobile Hotel School is a joint
              venture between (YGE) Yangon Global Enterprise (trading as Total
              Hospitality Solutions) and (IOH) Institute of Hospitality.
            </p>
            <p>
              {" "}
              (MMHS) MYANMAR MOBILE HOTEL SCHOOL is an Edexcel Approved Centre
              and franchise from (YGE) Yangon Global Enterprise (trading as
              Total Hospitality Solutions) to offer the Vocational and BA degree
              through (MMHS) MYANMAR MOBILE HOTEL SCHOOL.
            </p>
            <p>
              At the present time (MMHS) MYANMAR MOBILE HOTEL SCHOOL has 25
              students studying the foundation year in hospitality before
              progressing to the (HBM) Hotel Business Management in December
              2019.
            </p>
          </div>
        </div>
        <div className={classes.bottext}>
          <img src={dummyImage} className={classes.limage} />
          <div className={classes.text3}>
            <h4>Key principals</h4>
            <ol>
              <li>
                {" "}
                Aung Aung Lwin, (YGE) Yangon Global Enterprise (trading as Total
                Hospitality Solutions) Board Member, (MMHS) MYANMAR MOBILE HOTEL
                SCHOOL
              </li>
              <li>
                {" "}
                Zaw Lin Htet, Chairman, Board Member, (MMHS) MYANMAR MOBILE
                HOTEL SCHOOL
              </li>
              <li>
                {" "}
                Kay Thi Naing, Director of Studies, (MMHS) MYANMAR MOBILE HOTEL
                SCHOOL
              </li>
              <li>
                {" "}
                Aung Zaw Zaw Win, Program Manager, (MMHS) MYANMAR MOBILE HOTEL
                SCHOOL
              </li>
            </ol>
          </div>
        </div>
        <div className={classes.text4}>
          <h4 className={classes.h4oft4}>Conclusion</h4>
          <p>
            {" "}
            We work not only with every element that a five-star establishment
            boasts, but go the extra mile and discover what makes your stay
            unique by examining the individual experience. Our team has the
            knowledge, the expertise, and the true passion required to set your
            establishment apart. We live and breathe a world of quality and
            service, and are constantly learning how to make the best even
            better.
          </p>
          <p>
            {" "}
            We offer added value that was not thought possible by capitalizing
            on the natural genius through collaboration with our clients,
            partners and industry relationships. We understand the need in
            today’s market to produce superior results that exceed expectations.
          </p>
        </div>
      </div>
    </div>
  );
};
