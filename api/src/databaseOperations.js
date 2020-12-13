const fs = require('fs');

const DATABASE_FILE_CARS = './data/cars.json';
const DATABASE_FILE_USERS = './data/users.json';

const readCars = () => {
    if (!fs.existsSync(DATABASE_FILE_CARS)) {
        return [];
    }

    return JSON.parse(fs.readFileSync(DATABASE_FILE_CARS))
}

const writeCars = (newCars) => {
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
    }

    fs.writeFileSync(DATABASE_FILE_CARS, JSON.stringify(newCars, null, 4));
}

const readUsers = () => {
    if (!fs.existsSync(DATABASE_FILE_USERS)) {
        return [];
    }

    return JSON.parse(fs.readFileSync(DATABASE_FILE_USERS))
}

const writeUsers = (newUsers) => {
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
    }

    fs.writeFileSync(DATABASE_FILE_USERS, JSON.stringify(newUsers, null, 4));
}

module.exports = {
    readCars,
    writeCars,
    readUsers,
    writeUsers
}