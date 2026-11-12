function uniqueId() {
  return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

function createUser(overrides = {}){

    const id = uniqueId();

    return {
    firstName: 'Pratik',
    lastName: 'Tester',
    dob: '1995-06-15',
    country: 'US',
    postalCode: '10001',
    houseNumber: '12',
    street: 'Main Street',
    city: 'New York',
    state: 'NY',
    phone: '0871234567',
    email: `pw.user.${id}@example.com`,
    password: `Pw!${id}Aa`,
    ...overrides,

};
}
module.exports = {createUser,uniqueId};