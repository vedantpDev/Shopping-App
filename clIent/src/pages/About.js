import React from "react";
import { useDispatch, useSelector } from "react-redux";

const About = () => {
  const { name } = useSelector((store) => store.userData);
  return <div>About</div>;
};

export default About;
