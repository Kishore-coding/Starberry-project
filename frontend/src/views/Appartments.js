import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MainPage from "../components/MainPage";

const Appartments = () => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch(
      "https://carolineolds-strapi-dev.q.starberry.com/properties?_limit=20"
    )
      .then((response) => response.json())
      .then((info) => setData(info));
  }, []);

  return (
    <React.Fragment>
      <section>
        <Header />
      </section>
      <section>
        <MainPage appartmentData={data} />
      </section>
      <section>
        <Footer />
      </section>
    </React.Fragment>
  );
};

export default Appartments;
