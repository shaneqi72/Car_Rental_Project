import React from 'react';
import '../App.css';
import { Link, Route, Switch } from 'react-router-dom'
import UpdateCar from './UpdateCar';

function Car({ car, refreshCars }) {


    function updateAvailability() {

        fetch(`http://localhost:8800/cars/${car.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ brand: car.brand, model: car.model, price: car.price, available: !car.available })
        })
            .then(() => {
                refreshCars();
            });
    };

    function deleteCar() {
        fetch(`http://localhost:8800/cars/${car.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, */*',
                'Content-Type': 'application/json'
            },
        })
            .then(() => {
                refreshCars()
            });
    };

    return (
        <div>
            <ul>
                <li style={{ textDecoration: car.available ? '' : 'line-through' }} >Brand:{car.brand}<br />Model:{car.model} <br />Price:{car.price}</li>
            </ul>
            <Link to={`/cars/${car.id}/updates`}>Update</Link>
            <Switch>
                <Route component={() => <UpdateCar car={car} refreshCars={refreshCars} />} path={`/cars/${car.id}/updates`} />
            </Switch>
            <button onClick={updateAvailability}>Change Availablility</button>
            <button onClick={deleteCar}>Delete</button>

            {/* {cars.map((car) => {
                return (
                    <div>
                        <ul>
                            <li style={{ textDecoration: car.available ? '' : 'line-through' }} key={car.id}>Brand:{car.brand}<br />Model:{car.model} <br />Price:{car.price}</li>
                        </ul>
                        <button onClick={updateAvailability}>Update</button>
                        <button>Delete</button>
                    </div>
                )

            })} */}
        </div>
    );
};

export default Car;

// function Car() {

//     const [cars, setCars] = useState([]);

//     useEffect(() => {
//         getCars()
//     }, []);

//     function getCars() {
//         fetch('http://localhost:8800/cars')
//             .then((res) => res.json())
//             .then((cars) => setCars(cars))
//     }

//     return (
//         <div>
//             {cars.map((car) => <h1 key={car.id}>
//                 <Link to={`/cars/${car.id}`}>{car.brand}</Link>
//             </h1>)}
//         </div>
//     );
// };

// export default Car;

