//CSS
import './App.css'
//Hooks
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllActivities, getCountries } from './redux/actions';
import { useDispatch } from 'react-redux';
//Components
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Cards/Detail';
import AllActivities from './components/Form/AllActivities';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAll = async() => {
      dispatch(getCountries());
      dispatch(getAllActivities());
    }
    getAll();
}, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/activities' element={<AllActivities/>}/>
      </Routes>
    </>
  )
}

export default App;