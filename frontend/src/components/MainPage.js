import React from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import { Skeleton } from "antd";

const MainPage = ({ appartmentData }) => {
  return (
    <React.Fragment>
      <div>
        <h2 style={{ textAlign: "center", paddingTop: "5rem" }}>
          Property for Sales
        </h2>
        <section>
          <Filter filterData={appartmentData} />
        </section>
      </div>
      {!appartmentData?.length ? (
        <div>
          <Skeleton />,
          <Skeleton />
        </div>
      ) : (
        <ul className="appartments">
          {appartmentData?.map((data) => (
            <li>
              <div className="appartment">
                <Link
                  to={{
                    pathname: `/appartments/${data.id}`,
                    state: data,
                  }}
                >
                  <img src={data.Images[0]?.url} alt={data.Building_Type} />
                </Link>
                <div
                  style={{
                    textAlign: "center",
                    color: "grey",
                    fontSize: "19px",
                  }}
                >
                  <p>{data.Building_Type}</p>
                  <p>{data.Title}</p>
                  <strong style={{ color: "#534e4e" }}>
                    &#8364; {data.Price}
                  </strong>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
};

export default MainPage;
