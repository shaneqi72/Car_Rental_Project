import React from 'react';
import '../App.css';
import Car from './Car';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './CarsList.css'


function CarsList({ cars, refreshCars }) {

    return (
        <div className='flex-container'>
            {cars.map((car) => {
                return (
                    <Car key={car.id} car={car} refreshCars={refreshCars} />
                )
            })}
        </div>
    )
};

export default CarsList;