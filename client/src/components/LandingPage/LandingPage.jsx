//Hooks
import React from 'react';
import {Link} from 'react-router-dom';
//CSS
import './LandingPage.css';
import landingPage from '../../assets/LandingPage/landingPage.mp4';

const LandingPage = () => {
    return(
        <div className='landing'>

            <video src={landingPage} autoPlay loop muted className='videoBackground'></video>

            <h2 className='titulo'>Bienvenido a mi </h2>
            <h1 className='world'>WIKIWORLD</h1>
            <h2 className='titulo2'>Te invito a conocerla!</h2>

            <Link to='/home'>
                <button className='boton'>Vamos allá!</button>
            </Link>
            
        </div>
    )
}

export default LandingPage;