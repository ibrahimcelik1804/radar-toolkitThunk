import { MapContainer, Marker, Popup, TileLayer,Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "leaflet";
import { clear } from "../redux/selices/flightSlice";

const MappView = ({ openModal }) => {
  const state = useSelector((store) => store);
  const dispatch = useDispatch()



  const planeIcon = icon({
    iconUrl: "/plane.webp",
    iconSize: [25, 25],
  });
  const limeOptions = { color: 'lime' }
  return (
    <MapContainer
      center={[38.789205, 34.803749]}
      zoom={7}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; 
        <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {state.flights.map((flight) => (
        <Marker icon={planeIcon} position={[flight.lat, flight.lng]}>
          <Popup>
            <div className="popup gap-1">
              <span>Kod: {flight.code}</span>
              <button onClick={() => openModal(flight.id)}>Detay</button>
              { state.trail.length>0 && (<button onClick={()=> dispatch(clear())}>Rotayı Temizle</button>)}
            </div>
          </Popup>
        </Marker>
      ))}
      <Polyline  pathOptions={limeOptions} positions={state.trail}/>

    </MapContainer>
  );
};

export default MappView;
