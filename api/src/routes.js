const express = require('express');
const { readCars, writeCars } = require('./databaseOperations');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to Car Rental API' });
});

router.get('/cars', (req, res) => {
    let currentCars = readCars();
    let carAvailable = req.query.available;

    if (carAvailable) {
        currentCars = currentCars.filter((car) => car.available === carAvailable)
    }
    res.send(currentCars);
});

router.get('/cars/:id', (req, res) => {
    const currentCars = readCars();
    const carId = req.params.id;
    const car = currentCars.find((car) => car.id === carId);

    if (car) {
        res.send(car)
    }
    res.status(404).json({
        error: 'Car not found'
    });
});

router.post('/cars', (req, res) => {
    const currentCars = readCars();

    if (currentCars.some((car) => car.id === req.body.id)) {
        res.status(400).send({
            error: 'This ID is exist'
        });
    } else {
        const newCar = {
            id: req.body.id,
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            available: req.body.available
        };

        currentCars.push(newCar);

        writeCars(currentCars);

        res.json(newCar);
    }
});

router.put('/cars/:id', (req, res) => {
    const currentCars = readCars();
    const updatedCars = currentCars.find((car) => car.id === req.params.id);

    if (updatedCars) {
        updatedCars.brand = req.body.brand;
        updatedCars.model = req.body.model;
        updatedCars.price = req.body.price;
        updatedCars.available = req.body.available
    } else {
        res.status(404).json({
            message: 'Car not found'
        });
    }

    writeCars(currentCars);

    res.send(updatedCars)
});


router.delete('/cars/:id', (req, res) => {
    const currentCars = readCars();
    const updatedCars = currentCars.filter((car) => car.id !== req.params.id);

    writeCars(updatedCars);

    res.json({
        message: `Car with id of ${req.params.id} has been deleted`
    });
});

module.exports = router;