import React, { useState } from 'react';

function UpdateCar({ car, refreshCars }) {

    const [inputBrand, setInputBrand] = useState('');
    const [inputModel, setInputModel] = useState('');
    const [inputPrice, setInputPrice] = useState('');
    const [inputAvailable, setInputAvailable] = useState('');

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

    function handleUpdateCar(e) {
        e.preventDefault();

        const updatedCar = {
            id: car.id,
            brand: inputBrand,
            model: inputModel,
            price: inputPrice,
            available: true
        }
        if (updatedCar.brand.length && updatedCar.model.length && updatedCar.price.length) {
            fetch(`http://localhost:8800/cars/${car.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCar)
            })
                .then(() => refreshCars())
                .catch((err) => console.log(err))
        }
    }

    return (
        <div>
            <form >
                <label htmlFor="brand">Brand:</label>
                <input type="text" value={inputBrand} name='brand' onChange={handleInputBrand} />
                <label htmlFor="model">Model:</label>
                <input type="text" value={inputModel} name='model' onChange={handleInputModel} />
                <label htmlFor="price">Price:</label>
                <input type="text" value={inputPrice} name='price' onChange={handleInputPrice} />
                <label htmlFor="available">Available:</label>
                <input type="text" value={inputAvailable} name='available' onChange={handleInputAvailable} />
                <button type='submit' onClick={handleUpdateCar}>Update</button>
            </form>
        </div>
    )
};

export default UpdateCar;
