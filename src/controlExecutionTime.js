var controlExecutionTime = (callback, time, doAfterTimeExpires) => {
    let apiCall = setTimeout(callback, 0);

    setTimeout(() => {
        clearTimeout(apiCall);
        doAfterTimeExpires();
    }, time);
};

module.exports = controlExecutionTime;