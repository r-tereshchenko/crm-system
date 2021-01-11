const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

// (GET) localhost:8080/api/order?offset=2&limit=5
module.exports.getAllOrders = async function (req, res) {
    const filterOptions = {
        user: req.user.id
    }

    if (req.query.start) {
        filterOptions.date = {
            $gte: req.query.start
        }
    }

    if (req.query.end) {
        if (!filterOptions.date) {
            filterOptions.date = {}
        }

        filterOptions.date['$lte'] = req.query.end
    }

    if (req.query.order) {
        filterOptions.order = +req.query.order
    }

    try {
        const orders = await Order
            .find(filterOptions)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)
        console.log('orders: ', orders)
        res.status(200).json(orders)
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.createOrder = async function (req, res) {
    try {
        const lastOrder = await Order
            .findOne({user: req.user.id})
            .sort({date: -1})

        const maxOrder = lastOrder ? lastOrder.order + 1 : 1

        const order = await new Order({
            order:  maxOrder,
            list: req.body.list,
            user: req.user.id
        }).save();
        res.status(201).json(order);
    } catch (error) {
        errorHandler(res, error);
    }
}
