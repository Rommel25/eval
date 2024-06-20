import { Hono } from 'hono'
import { isValidObjectId } from 'mongoose'
import { Flippers } from '../models/flippers'
import { Brands } from '../models/brands'

const api = new Hono().basePath('/flippers')

api.get('/', async (c) => {
    const allFlippers = await Flippers.find({})
    return c.json(allFlippers)
})

api.get('/:flipperId', async (c) => {
    const _id = c.req.param('flipperId')

    if (isValidObjectId(_id)) {
        const flipper = await Flippers.findOne({ _id })
        return c.json(flipper)
    }
    return c.json({ msg: 'ObjectId malformed' }, 400)
})

api.post('/', async (c) => {
    const body = await c.req.json()
    try {
        const newFlipper = new Flippers(body)
        const saveCrea = await newFlipper.save()
        return c.json(saveCrea, 201)
    } catch (error: unknown) {
        return c.json(error._message, 400)
    }
})

api.put('/:flipperId', async (c) => {
    const _id = c.req.param('flipperId')
    const body = await c.req.json()
    const q = {
        _id
    }
    const updateQuery = {
        ...body
    }
    const tryToUpdate = await Flippers.findOneAndUpdate(q, updateQuery, { new: true })
    return c.json(tryToUpdate, 200)

})
api.patch('/:flipperId', async (c) => {
    const _id = c.req.param('flipperId')
    const body = await c.req.json()
    const q = {
        _id
    }
    const { flipper, ...rest } = body

    const updateQuery = {
        $addToSet: {
            flipper: flipper
        },
        $set: { ...rest }
    }
    const tryToUpdate = await Flippers.findOneAndUpdate(q, updateQuery, { new: true })
    return c.json(tryToUpdate, 200)

})

api.delete('/:flipperId', async (c) => {
    const _id = c.req.param('flipperId')
    const tryToDelete = await Flippers.deleteOne({ _id })
    const { deletedCount } = tryToDelete
    if (deletedCount) {
        return c.json({ msg: "DELETE done" })
    }
    return c.json({ msg: "not found" }, 404)

})



export default api