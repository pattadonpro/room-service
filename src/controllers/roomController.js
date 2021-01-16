const Room = require('../models/roomModel'),
    createError = require('http-errors');

const methods = {

    async createRoom(req, res, next) {
        try {
            const room = new Room(req.body);
            const createdRoom = await room.save();
            res.status(201).json(createdRoom);
        } catch (err) {
            next(err);
        }
    },

    async findRooms(req, res, next) {
        try {
            const query = methods.buildQuery(req.query);
            const sort = methods.buildSort(req.query);
            const page = req.query.page ? parseInt(req.query.page) : 0;
            const size = req.query.size ? parseInt(req.query.size) : 20;
            const rooms = await Room.find(query)
                .sort(sort)
                .skip(page * size)
                .limit(size);
            const count = await Room.countDocuments(query);
            res.status(200)
                .header("X-Total-Count", count)
                .json(rooms);
        } catch (err) {
            next(err);
        }
    },

    async findRoomById(req, res, next) {
        try {
            const room = await Room.findById(req.params.id);
            if (!room) {
            throw createError(404, 'room not found');
            }
            res.status(200).json(room);
        } catch (err) {
            next(err);
        }
    },

    buildQuery(params) {
        const query = {};
        if (params.title) {
            query.title = {$regex: params.title, $options: "i"};
        }
        if (params.type) {
            query.type = params.type;
        }
        if (params.priceType) {
            query.priceType = params.priceType;
        }
        if (params.minPrice || params.maxPrice) {
            let gte = {};
            let lte = {};
            if (params.minPrice) {
                gte = {$gte: params.minPrice};
            }
            if (params.maxPrice) {
                lte = {$lte: params.maxPrice};
            }
            query.price = Object.assign(gte, lte);
        }
        return query;
    },

    buildSort(params) {
        const sort = {};
        if (params.sort) {
            const arr = params.sort.split(",");
            if (arr.length === 2) {
                sort[arr[0]] = arr[1];
            }
        }
        return sort;
    }
}

module.exports = {...methods}
