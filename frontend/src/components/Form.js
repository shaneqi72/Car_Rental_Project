import React, { useState } from 'react';

function Form({ refreshCars, status, setStatus }) {

    const [inputBrand, setInputBrand] = useState('');
    const [inputModel, setInputModel] = useState('');
    const [inputPrice, setInputPrice] = useState('');
    const [inputAvailable, setInputAvailable] = useState('')




    function handleAddCar(e) {
        e.preventDefault();

        const newCar = {
            id: `${Date.now()}`,
            brand: inputBrand,
            model: inputModel,
            price: inputPrice,
            available: inputAvailable
        }

        if (newCar.brand.length && newCar.model.length && newCar.price.length && newCar.available.length > 0) {
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
        setInputAvailable('');
    };


    function handleInputBrand(e) {
        setInputBrand(e.target.value)
    }
    function handleInputModel(e) {
        setInputModel(e.target.value)
    }
    function handleInputPrice(e) {
        setInputPrice(e.target.value)
    }
    function handleInputAvailable(e) {
        setInputAvailable(e.target.value)
    }

    function handleChange(e) {
        setStatus(e.target.value)
    }

    return (
        <form >
            <label htmlFor="brand">Brand:</label>
            <input type="text" value={inputBrand} name='brand' onChange={handleInputBrand} />
            <label htmlFor="model">Model:</label>
            <input type="text" value={inputModel} name='model' onChange={handleInputModel} />
            <label htmlFor="price">Price:</label>
            <input type="text" value={inputPrice} name='price' onChange={handleInputPrice} />
            <label htmlFor="available">Available:</label>
            <input type="text" value={inputAvailable} name='available' onChange={handleInputAvailable} />
            <button type='submit' onClick={handleAddCar}>Add new Car</button>
            <div>
                <select name="cars" onChange={handleChange}>
                    <option value="allCars">All Cars</option>
                    <option value="availableCars">Available Cars</option>
                    <option value="unavailableCars">Unavailable Cars</option>
                </select>
            </div>
        </form>
    )
};

export default Form;