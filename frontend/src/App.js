import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Nav from './components/Nav';
import Cars from './components/Car';
import About from './components/About';
import CarDetail from './components/CarDetail';
import Form from './components/Form';
import CarsList from './components/CarsList';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {

  const [cars, setCars] = useState([]);
  const [status, setStatus] = useState('');


  const getCars = (status) => {
    fetch('http://localhost:8800/cars')
      .then((res) => {
        if (!res.ok) {
          throw Error('Error')
        }
        return res.json();
      })
      .then((cars) => {
        switch (status) {
          case 'availableCars':
            setCars(cars.filter((car) => car.userId === null));
            break;
          case 'unavailableCars':
            setCars(cars.filter((car) => car.userId !== null));
            break;
          default:
            setCars(cars);
            break;
        }
      });
  };

  useEffect(() => {
    getCars(status)
  }, [status]);

  // return (
  //   <Router>
  //     <div className="App">
  //       <Nav />
  //       <Form />
  //       <Switch>
  //         <Route path='/' exact component={Home} />
  //         <Route path='/about' component={About} />
  //         <Route path='/cars' exact component={Cars} />
  //         <Route path='/cars/:id' component={CarDetail} />
  //       </Switch>
  //     </div>
  //   </Router>
  // );

  return (
    <div className='app'>
      <div className='title'>
        <h1>Rental Car Management</h1>
      </div>
      <Form refreshCars={getCars} status={status} setStatus={setStatus} />
      <Router>
        <CarsList cars={cars} refreshCars={getCars} />
      </Router>
    </div>
  )
}

export default App;
