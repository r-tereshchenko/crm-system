module.exports.getAllCategories = function (req, res) {
    res.status(200).json({
        getAllCategories: true
    })
}

module.exports.getByCategoryId = function (req, res) {
    res.status(200).json({
        getByCategoryId: true
    })
}

module.exports.createCategory = function (req, res) {
    res.status(200).json({
        createCategory: true
    })
}

module.exports.updateCategory = function (req, res) {
    res.status(200).json({
        updateCategory: true
    })
}

module.exports.removeCategory = function (req, res) {
    res.status(200).json({
        removeCategory: true
    })
}
