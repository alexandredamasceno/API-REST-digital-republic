const createAccountAndAgency = () => {
    const numbers = '0123456789';
    const agency = '0002';
    let account = '';

    for (let i = 0; i < 9; i += 1) {
        if (i === 8) {
            account += `-${numbers[Math.floor(Math.random() * numbers.length)]}`;
        } else {
            account += numbers[Math.floor(Math.random() * numbers.length)];
        }
    }

    return { agency, account };
};

module.exports = {
    createAccountAndAgency,
};
