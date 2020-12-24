module.exports.getAllCategories = function (req, res) {
    res.json({
        message: 'All Categories'
    })
}

module.exports.getByCategoryId = function (req, res) {
    res.json({
        message: 'getByCategoryId'
    })
}

module.exports.createCategory = function (req, res) {
    res.json({
        message: 'createCategory'
    })
}

module.exports.updateCategory = function (req, res) {
    res.json({
        message: 'updateCategory'
    })
}

module.exports.removeCategory = function (req, res) {
    res.json({
        message: 'removeCategory'
    })
}
