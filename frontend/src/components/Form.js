import React, { useState, useEffect, useReducer } from 'react';
import './Form.css'

const Form = ({ refreshCars, status, setStatus }) => {

    const [inputBrand, setInputBrand] = useState('');
    const [inputModel, setInputModel] = useState('');
    const [inputPrice, setInputPrice] = useState('');
    const [inputUsers, setInputUsers] = useState('')

    const handleInputBrand = (e) => {
        setInputBrand(e.target.value)
    }
    const handleInputModel = (e) => {
        setInputModel(e.target.value)
    }
    const handleInputPrice = (e) => {
        setInputPrice(e.target.value)
    }


    const handleChange = (e) => {
        setStatus(e.target.value)
    }

    const handleInputUserName = (e) => {
        setInputUsers(e.target.value)
    }

    const handleUserSubmit = (e) => {
        // e.preventDefault();

        const newUser = {
            id: `${Date.now()}`,
            name: inputUsers
        }

        if (newUser.name.length > 0) {
            fetch('http://localhost:8800/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
                .then((res) => res.json())
                .then((users) => setInputUsers(users))
                .catch((err) => console.log(err))
        }
        setInputUsers('');
        refreshCars();
    }

    useEffect(() => {
        handleUserSubmit()
    }, []);

    const handleAddCar = (e) => {
        e.preventDefault();

        const newCar = {
            id: `${Date.now()}`,
            brand: inputBrand,
            model: inputModel,
            price: inputPrice
        }

        if (newCar.brand.length && newCar.model.length && newCar.price.length > 0) {
            fetch('http://localhost:8800/cars', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCar)
            })
                .then(() => refreshCars())
                .catch((err) => console.log(err))
        }
        setInputBrand('');
        setInputModel('');
        setInputPrice('');
    };




    return (
        <form className='form-container'>
            <div className='form-add-new-car'>
                <div className='brand-label-input'>
                    <label htmlFor="brand">Brand:</label>
                    <input className='input-box' required type="text" value={inputBrand} name='brand' onChange={handleInputBrand} />
                </div>
                <div className='model-label-input'>
                    <label htmlFor="model">Model:</label>
                    <input className='input-box' required type="text" value={inputModel} name='model' onChange={handleInputModel} />
                </div>
                <div className="price-label-input">
                    <label htmlFor="price">Price:</label>
                    <input className='input-box' required type="text" value={inputPrice} name='price' onChange={handleInputPrice} />
                </div>
                <div className='add-new-car-btn'>
                    <button className='btn submit-btn' type='submit' onClick={handleAddCar}>Add new Car</button>
                </div>
            </div>

            <div className='flex-container-addUser-selector'>
                <div className='add-user'>
                    <label htmlFor="user-name">User Name: </label>
                    <input className='input-box' type="text" required value={inputUsers} name='userName' onChange={handleInputUserName} />
                </div>
                <div className='add-new-user'>
                    <button className='btn submit-btn' onClick={handleUserSubmit} type='submit'>Add New User</button>
                </div>

                <div className='selector'>
                    <select className='status-selector' name="cars" onChange={handleChange}>
                        <option value="allCars">All Cars</option>
                        <option value="availableCars">Available Cars</option>
                        <option value="unavailableCars">Unavailable Cars</option>
                    </select>
                </div>
            </div>


        </form>
    )
};

export default Form;