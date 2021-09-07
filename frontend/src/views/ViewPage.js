import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ViewPage(props) {
  const viewData = props.location.state;

  return (
    <React.Fragment>
      <section>
        <Header />
      </section>

      <section className="main-page">
        <div className="left-container">
          <img
            className="main-image"
            src={viewData?.Images[0]?.url}
            alt={viewData?.Building_Type}
          />

          <ul className="view-images">
            <li className="view-image">
              <img
                src={viewData?.Images[1]?.url}
                alt={viewData?.Building_Type}
              />
            </li>
            <li className="view-image">
              <img
                src={viewData?.Images[2]?.url}
                alt={viewData?.Building_Type}
              />
            </li>
          </ul>
        </div>
        <div className="right-container">
          <div style={{ textAlign: "end" }}>
            <i
              style={{ padding: "0 10px" }}
              class="fa fa-share-alt"
              aria-hidden="true"
            ></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
          <hr></hr>
          <div>
            <h2>
              {" "}
              &#8364; {viewData?.Price}
              <span
                style={{
                  color: "#534e4e",
                  fontSize: "20px",
                  marginLeft: "1rem",
                }}
              >{` ${viewData?.Bedrooms} | ${viewData?.Price_Per_Sqm}`}</span>
            </h2>
            <p>1 bedroom appartment for sale in the Frontvieille</p>
            <div>
              <a
                href="https://www.99acres.com/faq/"
                target="_blank noreferer noopener"
              >
                Please contact us
              </a>
            </div>
            <div className="contact-agent">
              <button>CONTACT AGENT</button>
            </div>
            <div style={{ fontSize: "22px" }}>FACTS AND FEATURES</div>
            <section className="features">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="facts">Neighbourhood:</p>
                <p>Frontvieille</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="facts">Price per sqm:</p>
                <p>{viewData?.Price_Per_Sqm}</p>
              </div>
              {viewData?.Brochure?.map((brochure) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p className="facts">Brochure:</p>
                  <p className="link">
                    <a
                      href={`${brochure.url}`}
                      target="_blank noreferer noopener"
                      download
                    >
                      Download Brochure
                    </a>
                  </p>
                </div>
              ))}
              {viewData?.Floor_Plans?.map((floor) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p className="facts">Floor plan:</p>
                  <p className="link">
                    <a
                      href={`${floor?.url}`}
                      target="_blank noreferer noopener"
                    >
                      View Floorplan
                    </a>
                  </p>
                </div>
              ))}
            </section>
            <div className="description">
              <p>
                Superb and peaceful location in the port of Fontvieille
                surrounded by the harbour and sea.1 bedroom apartment with a
                lovely terrace spacious bedroom and kitchen.The residence
                includes concierge and a cellar.
              </p>
            </div>
            <div style={{ display: "flex" }}>
              <div className="broker-image">
                <img
                  src={viewData?.Negotiator.Image.url}
                  alt={viewData?.Negotiator.name}
                />
              </div>
              <div>
                <h3>{viewData?.Negotiator.Name}</h3>
                <p>{viewData?.Negotiator.Designation}</p>
                <p>
                  +{viewData?.Negotiator.Phone} | {viewData?.Negotiator.Email}
                </p>
              </div>
            </div>
            {/* map */}
            <div>
              <iframe
                title="map"
                src="http://maps.google.com/maps?q=43.73490730890976, 7.4126597211477865&z=16&output=embed"
                className="map"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <Footer />
      </section>
    </React.Fragment>
  );
}

export default ViewPage;
