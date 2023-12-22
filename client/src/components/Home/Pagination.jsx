//Hooks
import { useDispatch, useSelector } from "react-redux";
//Actions
import { next, pageNumber, prev } from "../../redux/actions";
//CSS
import './CSS/Pagination.css';

const Pagination = ({ lastCountry, actualPage, totalPages }) => {

  const allCountries = useSelector(state => state.countries);
  const dispatch = useDispatch();

  //Si no hay más páginas para mostrar
    const noMoreNext = lastCountry < allCountries?.length;
    const noMorePrev = actualPage > 1;

    const pages = () => {
      const pageNumbers = [];

      for(let i = 1; i <= totalPages; i++){
        pageNumbers.push(
          <button
            key={i}
            className='botonPage'
            onClick={() => dispatch(pageNumber(i))}
          >
            {i}
          </button>
        )
      }
      return pageNumbers;
    }

  return (
    <div className="paginationContainer">
      <button className='izq' onClick={() => dispatch(prev())} disabled={!noMorePrev}>🔙</button>
      <div className="allButtonsPage">
      {pages()}
      </div>
      <button className='der' onClick={() => dispatch(next())} disabled={!noMoreNext}>🔜</button>
    </div>
  )
}

export default Pagination;