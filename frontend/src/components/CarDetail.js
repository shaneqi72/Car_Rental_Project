import React, { useEffect, useState } from 'react';
import '../App.css';


function CarDetail({ match }) {

    console.log(match);

    useEffect(() => {
        fetchCar();
    }, []);

    const [car, setCar] = useState({});

    function fetchCar() {
        fetch(`http://localhost:8800/cars/${match.params.id}`)
            .then((res) => res.json())
            .then((car) => setCar(car))
    }

    return (
        <div>
            <h1>{car.model}</h1>
        </div>
    );
};

export default CarDetail;