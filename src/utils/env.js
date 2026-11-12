require('dotenv').config({quiet:true});

const env = {
    baseUrl : process.env.BASE_URL ?? 'https://practicesoftwaretesting.com',
    customer : {
        email : process.env.CUSTOMER_EMAIL,
        password : process.env.CUSTOMER_PASSWORD,
    },
};

module.exports = {env};