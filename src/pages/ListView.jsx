import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
import { useState } from "react";


const ListView = ({openModal}) => {

  const state = useSelector((store) => store);
// gösterilecek ilk elemanı
  const [itemOffset, setItemOffset] = useState(0);
  // sayfada gösterilecek eleman sayısı
  const itemsPerPage=10
  // gösterilecek son elemanı
  const endOffset = itemOffset + itemsPerPage;
  // elimizdeki aralığa göre verileri kesiyoruz
  const currentItems = state.flights?.slice(itemOffset, endOffset);
  // toplam sayfa saayısını hesdaapla
  const pageCount = Math.ceil(state.flights?.length / itemsPerPage);
// her sayfa değiştiğinde çalışır
  const handlePageClick = (event) => {
    // gösterilecek ilk elemanı belirler
    const newOffset = (event.selected * itemsPerPage)
      // state günceliyoruz
    setItemOffset(newOffset);
  };
  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="d-flex justify-content-center flex-column">
          <table className="table table-dark table-striped table-hover mt-1 table-responsive text-center p-5">
        <thead>
          <tr className="px-2 py-2">
            <th className="px-2 py-2"  >id</th>
            <th  className=" px-2 py-2" >Kuyruk Kodu</th>
            <th  className="px-2 py-2" >Enlem</th>
            <th className=" px-2 py-2" >Boylam</th>
            <th></th>
          </tr>
        </thead>
        <tbody  className=" align-middle p-1" >
          {currentItems.map((i) => (
            <tr className="px-2 py-2">
              <td className="px-2 py-2"  >{i.id}</td>
              <td   className="px-2 py-2" >{i.code}</td>
              <td  className="px-2 py-2" >{i.lat}</td>
              <td  className="px-2 py-2" >{i.lng}</td>
              <td  className="px-2 py-2">
                <button  className="px-2 py-1" onClick={()=> openModal(i.id)}>Detay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
        </div>
      </div>


      <ReactPaginate 
      className="pagination"
        breakLabel="..."
        nextLabel="İleri >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Geri"
        
        
      />
    </div>
  );
};

export default ListView;
