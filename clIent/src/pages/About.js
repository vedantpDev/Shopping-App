import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const About = () => {
  const { name } = useSelector((store) => store.userData);
  const { product } = useSelector((store) => store.productDataReducer);
  console.log(product);
  return <div>About</div>;
};

export default About;
