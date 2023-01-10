import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const About = () => {
  const { name } = useSelector((store) => store.userData);
  const { storeSubCatId } = useSelector((store) => store.productDataReducer);
  return <div>About</div>;
};

export default About;
