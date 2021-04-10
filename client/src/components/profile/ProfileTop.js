import React, { Fragment } from "react";
import PropTypes from "prop-types";

ProfileTop.propTypes = {};

function ProfileTop({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) {
  {
    console.log(social);
  }
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {website && (
          <a href="/#" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter-square" style={{ fontSize: "2.2rem" }}></i>
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i
              class="fab fa-facebook-square"
              style={{ fontSize: "2.2rem" }}
            ></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin" style={{ fontSize: "2.2rem" }}></i>
          </a>
        )}

        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-youtube" style={{ fontSize: "2.2rem" }}></i>
          </a>
        )}

        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram" style={{ fontSize: "2.2rem" }}></i>
          </a>
        )}
      </div>
    </div>
  );
}

export default ProfileTop;
