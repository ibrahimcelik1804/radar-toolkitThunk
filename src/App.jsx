import { useEffect, useState } from "react";
import Header from "./components/Header";
import ListView from "./pages/ListView";
import MappView from "./pages/MappView";
import { useDispatch } from "react-redux";
import { getFlights } from "./redux/actions/FlightAction";
import Modal from "./components/Modal";

function App() {
  const [isMapView, setIsMapView] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const dispatch = useDispatch();

  // modal' acar
  const openModal = (id) => {
    setDetailId(id);
    setIsOpen(true);
  };

  // modal'ı kapatır
  const closeModal = () => {
    setDetailId(null);
    setIsOpen(false);
  };

  useEffect(() => {
    
      dispatch(getFlights())},
      
     []);

  return (
    <>
      <Header />
      <div className="view-buttons mb-2">
        <button
          className={isMapView ? "active" : ""}
          onClick={() => setIsMapView(true)}
        >
          Harita Görünümü
        </button>
        <button
          className={!isMapView ? "active" : ""}
          onClick={() => setIsMapView(false)}
        >
          Liste Görünümü
        </button>
      </div>
      {isMapView ? <MappView openModal={openModal} /> : <ListView openModal={openModal}  />}
      {isOpen && <Modal detailId={detailId} closeModal={closeModal} />}
    </>
  );
}

export default App;
