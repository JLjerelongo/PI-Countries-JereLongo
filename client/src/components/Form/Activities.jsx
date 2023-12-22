//Hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
//Actions
import { getAllActivities, deleteActivities } from "../../redux/actions";
//CSS
import './CSS/Activities.css';

const Activities = () => {
    const allActivities = useSelector(state => state.activities);
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getAllActivities());
    }, [])

    return (
        <>
        <div className="texts">
            <h1 className="textActivity">Lista de actividades</h1>
             <h2 className="textActivity2">Crea la actividades de los paises que quieras visitar!</h2>
        </div>

            <div className="activityCreatedContainer">
                {Array.isArray(allActivities) && allActivities.map((activ) => {
                    return (
                        <div className="activitiesContainer" key={activ.id}>

                                <h3 className="nameActivityCreated">Activity Name: {activ.name}</h3>  
                                <h3 className="dificultyActivityCreated"> Dificulty: {activ.dificulty}</h3> 
                                <h3 className="seasonActivityCreated"> Season: {activ.season}</h3> 

                                <button className="botonDeleteActivity" onClick={() => dispatch(deleteActivities(activ.id))}>Delete</button>
                                <hr className="hr"/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Activities;