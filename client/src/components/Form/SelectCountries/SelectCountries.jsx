//Hooks
import { useContext } from "react";
//CSS
import '../CSS/SelectCountries.css';
//Components
import { myContext } from "./Contexto";

const SelectCountries = ({ allCountries, openSelect, setOpenSelect }) => {
    const allCountriesOrder = [...allCountries].sort((a, b) => a.name.localeCompare(b.name));
    const { countriesId, setCountriesId } = useContext(myContext);

    const seleccionarPais = (pais) => {
        if (countriesId.some((paisC) => paisC === pais.id)) return setCountriesId(countriesId.filter((country) => country !== pais.id));
        else return setCountriesId([...countriesId, pais.id]);
    }

    return (
        <>
            <div className="selectContainer">
                <div className='selectFinal' onClick={() => {
                    if (!openSelect) setOpenSelect(true)
                    else setOpenSelect(false)
                }}> Seleccionar países...</div>
                <div className={openSelect ? 'bodySelects' : 'bodySelectsDos'}>
                    <div className="selectContainer2">
                        {allCountriesOrder.map((pais) => {
                            return (
                                <div key={pais.name} className="selectionContainerFinal">
                                    <div className="selection" >
                                        <input type="checkbox" onClick={() => seleccionarPais(pais)} />
                                        <div className="noUserSelection"> {pais.name} </div>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>

            </div>

        </>
    )
}

export default SelectCountries;