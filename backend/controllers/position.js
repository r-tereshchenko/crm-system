module.exports.getByPositionId = function (req, res) {
    res.status(200).json({
        getByPositionId: true
    })
}

module.exports.removePosition = function (req, res) {
    res.status(200).json({
        removePosition: true
    })
}

module.exports.createPosition = function (req, res) {
    res.status(200).json({
        createPosition: true
    })
}

module.exports.updatePosition = function (req, res) {
    res.status(200).json({
        updatePosition: true
    })
}
