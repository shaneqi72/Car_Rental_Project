import React from 'react';
import '../App.css';
import Car from './Car';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function CarsList({ cars, refreshCars }) {

    return (
        <div>
            {cars.map((car) => {
                return (
                    <Car key={car.id} car={car} refreshCars={refreshCars} />
                )
            })}
        </div>
    )
};

export default CarsList;