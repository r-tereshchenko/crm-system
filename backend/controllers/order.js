module.exports.getAllOrders = function (req, res) {
    res.status(200).json({
        getAllOrders: true
    })
}

module.exports.createOrder = function (req, res) {
    res.status(200).json({
        createOrder: true
    })
}
