import React from "react";
import { Typography, Row, Col } from "antd";
import {
  HomeFilled,
  MailFilled,
  PhoneFilled,
  FacebookFilled,
} from "@ant-design/icons";
import classes from "./Footer.module.css";
import instagramImage from "../dummyImages/instagram.svg";
import facebookImage from "../dummyImages/facebook.svg";
import twitterImage from "../dummyImages/twitter.svg";
import youtubeImage from "../dummyImages/youtube.svg";

import { SocialComponent, style, ContactInfo } from "../Exporter/Exporter";
const { Title, Text } = Typography;
const dummyText = `Lorem Ipsum is Very Good. It is indeed.Lorem Ipsum is Very Good.
It is indeed.Lorem Ipsum is Very Good. It is indeed.`;
export const Footer = () => {
  return (
    <Row style={style.rowContainer} gutter={[0, 32]}>
      <Col lg={10} style={style.aboutUs} md={24}>
        <Title style={style.footerTitle} level={3}>
          More About School
        </Title>
        <Text style={style.aboutUsDescription}>
          <strong>
            Good Morning pr everybody. Coffee Tu Tu Thout Ya Aung.Good Morning
            pr everybody. Coffee Tu Tu Thout Ya Aung.Good Morning pr everybody.
            Coffee Tu Tu Thout Ya Aung.
          </strong>
        </Text>
        <Title level={5} type="secondary" style={style.aboutUsAuthor}>
          -Thang Paa
        </Title>
      </Col>

      <Col lg={5} md={10} sm={12} xs={24} style={style.socialMediaColContainer}>
        <Title level={3} style={style.footerTitle}>
          Keep Connected
        </Title>
        <div style={style.socialMediaCol} >
          <SocialComponent
            link="https://www.facebook.com"
            image={facebookImage}
            classes={classes.footer_icon}
            key="FacebookFooter"
          />
          <SocialComponent
            link="https://www.instagram.com"
            image={instagramImage}
            classes={classes.footer_icon}
            key="InstagramFooter"
          />
          <SocialComponent
            link="https://www.twitter.com"
            image={twitterImage}
            classes={classes.footer_icon}
            key="TwitterFooter"
          />
          <SocialComponent
            link="https://www.youtube.com"
            image={youtubeImage}
            classes={classes.footer_icon}
            key="YoutubeFooter"
          />
        </div>
      </Col>
      
      <Col lg={8} md={10} sm={12} xs={24} style={style.contactUsCol}>
        <Col>
          <Title level={3} style={style.footerTitle}>
            Contact Information
          </Title>
          <div style={style.contactUsText}>
            <ContactInfo
              icon={<HomeFilled style={{ color: "white" }} />}
              text={dummyText}
            />
          </div>

          <div style={style.contactUsText}>
            <ContactInfo
              icon={<PhoneFilled style={{ color: "white" }} />}
              text={dummyText}
            />
          </div>

          <div style={style.contactUsText}>
            <ContactInfo
              icon={<MailFilled style={{ color: "white" }} />}
              text={dummyText}
            />
          </div>
        </Col>
      </Col>
    </Row>
  );
};
