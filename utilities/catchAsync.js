module.exports = f => { // If there's an error in the function, we catch it
    return (req, res, next) => {
        f(req, res, next).catch(next);
    };
};