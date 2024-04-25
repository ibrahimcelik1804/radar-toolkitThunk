import { useSelector } from "react-redux";

const Header = () => {
  const state = useSelector((store) => store);
 // console.log(state);
  return (
    <header>
      <div>
        <img src="/logo.png" />
        <h3>Uçuş Radarı</h3>
      </div>
      <p >
        {state.isLoading
          ? "Uçuşlar Hesaplamıyor..."
          : state.isError
          ? "Üzgünüz Bir Hata Oluştu"
          :state.flights.length + " Uçuş Bulundu" }
      </p>
    </header>
  );
};

export default Header;
