import React from 'react';
import '../App.css';
import Car from './Car';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './CarsList.css'


function CarsList({ cars, refreshCars }) {

    return (
        <div className='flex-container'>
            <div className='flex-container'>
                <div className='table-container'>
                    <table className='table' style={{ width: "100%" }}>
                        <tr className='table-head'>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Price</th>
                            <th className='table-button'>
                                Action
                            </th>
                        </tr>
                        {cars.map((car) => {
                            return (
                                <Car key={car.id} car={car} refreshCars={refreshCars} />
                            )
                        })}

                    </table>
                </div>
            </div>
        </div>
    )
};

export default CarsList;