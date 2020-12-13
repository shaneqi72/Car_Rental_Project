import React, { useState, useEffect } from 'react';
import '../App.css';
import './Car.css';

const Car = ({ car, refreshCars }) => {

    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [databaseUsers, setDatabaseUsers] = useState([]);

    const handleReturnStatus = () => {

        fetch(`http://localhost:8800/cars/${car.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ brand: car.brand, model: car.model, price: car.price, userId: null })
        })
            .then(() => {
                refreshCars();
                setUser(null);
            });
    };

    const deleteCar = () => {
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

    useEffect(() => {
        if (car.userId) {
            const fetchUser = () => {
                fetch(`http://localhost:8800/users/${car.userId}`)
                    .then((res) => res.json())
                    .then((user) => {
                        if (user) {
                            setUser(user)
                        }
                    });
            };

            fetchUser();
        };
    }, [car.userId]);

    useEffect(() => {
        const fetchUsers = () => {
            fetch('http://localhost:8800/users')
                .then((res) => res.json())
                .then((users) => setDatabaseUsers(users))
        }

        fetchUsers();
    }, []);

    const handleUserNameSelection = (e) => {
        console.log('Value:', e.target.value);

        if (e.target.value === '') {
            return;
        }

        console.log('Update car');

        fetch(`http://localhost:8800/cars/${car.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ brand: car.brand, model: car.model, price: car.price, userId: e.target.value })
        })
            .then(() => {
                refreshCars();
            });
    };

    let updateFormJSX = open ? (
        <form className='select-user'>
            <select name="Users" onChange={handleUserNameSelection} >
                <option value=''>Select User</option>
                {databaseUsers.map((user) => {
                    return (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    )
                })}
            </select>
        </form>
    ) : null;

    return (
        <tr>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.price}</td>
            <td>
                <ul className='button-list'>
                    <li>
                        <button
                            className='btn btn-return'
                            onClick={handleReturnStatus}
                        >
                            Return
                                    </button>
                    </li>
                    <li>
                        <button
                            className='btn btn-update'
                            type='submit'
                            onClick={() => {
                                setOpen(!open);
                            }}>
                            Update User
                                    </button>
                    </li>
                    <li>
                        <button
                            className='btn btn-delete'
                            onClick={deleteCar}
                        >
                            Delete
                                        </button>
                    </li>
                </ul>
            </td>
            <td>
                {user ? `Rented By: ${user.name}` : null}
                {/* <div className='btn'>
        //     <button
        //         className='btn-return'
        //         onClick={handleReturnStatus}
        //     >
        //         Return
        //     </button>
        //     <button
        //         className='btn-delete'
        //         onClick={deleteCar}
        //     >
        //         Delete
        //     </button>
        //     <button
        //         className='btn-update'
        //         type='submit'
        //         onClick={() => {
        //             setOpen(!open);
        //         }}>
        //         Update User
        //     </button>
        // </div> */}
                {updateFormJSX}
            </td>
        </tr>
    );
};

export default Car;

