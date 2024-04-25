import axios from "axios";
import { useEffect, useState } from "react";
import { options2 } from "../constant";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useDispatch } from "react-redux";
import { setTrail } from "../redux/selices/flightSlice";
import moment from "moment";
import "moment/locale/tr";

const Modal = ({ detailId, closeModal }) => {
  const dispatch = useDispatch();
  const [d, setData] = useState(null);
  useEffect(() => {
    setData(null);
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        options2
      )
      .then((res) => {
        dispatch(setTrail(res.data.trail));
        setData(res.data);
      });
  }, [detailId]);
  const formatDate = (unix_time) => {
    const date = new Date(unix_time * 1000).toUTCString();
    return moment(date).calendar();
  };

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close-area">
          <span className=""  onClick={closeModal}>X</span>
        </p>

        {!d ? (
          <div className="wrapper">
            <div className="loader">
              <span className=" fs-sm">Loader</span>
            </div>
          </div>
        ) : !d.airport.origin || !d.airport.destination ? (
          <div className="p-2 m-2">
            <p className="p-2 m-2">{d.airline?.name}</p>
            <p>Bu Uçuşun Verileri Gizlidir.</p>
          </div>
        ) : (
          <>
            <h6 className="e">{d.aircraft.model.text}</h6>
            <h6 className="e">{d.aircraft.model.code}</h6>
            <p>{d.aircraft.registration}</p>

            <Splide
              className="splide"
              options={{
                rewind: true,
                arrows: false,
              }}
            >
              {d.aircraft.images.large.map((image, index) => (
                <SplideSlide key={index}>
                  <img
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    src={image.src}
                  />
                </SplideSlide>
              ))}
            </Splide>
            <p className="e">
              <span>Şirket :</span>
              <span> {d.airline.name}</span>
            </p>
            <p className="e">
              <span>Kalkış : </span>
              <a target="_blank" href={d.airport.origin.website}>
                {d.airport.origin.name}
              </a>
            </p>
            <p className="e">
              <span>Hedef : </span>
              <a target="_blank" href={d.airport.destination.name}>
                {d.airport.destination.name}
              </a>
            </p>

            <p>
              <span>Kalkış Saati :</span>
              <span>{formatDate(d.time.scheduled.departure)}</span>
            </p>
            <p>
              <span>İniş Saati :</span>
              <span>{formatDate(d.time.scheduled.arrival)}</span>
            </p>
            <p className={d.status.icon}>
              <span>{d.status.text}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
