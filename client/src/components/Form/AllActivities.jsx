//Hooks
import { useState } from "react";
import { Link } from "react-router-dom";
//Components
import Activities from "./Activities";
import Form from "./Form";
//CSS
import './CSS/AllActivities.css';
import formVideo from '../../assets/form/formVideo.mp4'

const AllActivities = () => {

    const [modal, setModal] = useState(false);

    return (
        <>
            <Activities />
            <Form
                modal={modal}
                closeModal={() => setModal(false)}
            />
            <button className="botonCreateActivity" onClick={() => setModal(true)}>Create Activity</button>
            <Link to='/home'>
                <button className="botonBackActivity">◀ Back</button>
            </Link>
            <video autoPlay loop muted className='homeVideo'>
                <source src={formVideo} type='video/mp4' />
            </video>
        </>
    )
}

export default AllActivities;