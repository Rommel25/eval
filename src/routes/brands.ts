import { Hono } from 'hono'
import { isValidObjectId } from 'mongoose'
import { Brands } from '../models/brands'

const api = new Hono().basePath('/brands')

api.get('/', async (c) => {
    const allBrands = await Brands.find({})
    return c.json(allBrands)
})

api.get('/:brandId', async (c) => {
    const _id = c.req.param('brandId')

    if (isValidObjectId(_id)) {
        const brand = await Brands.findOne({ _id })
        return c.json(brand)
    }
    return c.json({ msg: 'ObjectId malformed' }, 400)
})

api.post('/', async (c) => {
    const body = await c.req.json()
    try {
        const newBrand = new Brands(body)
        const saveCrea = await newBrand.save()
        return c.json(saveCrea, 201)
    } catch (error: unknown) {
        return c.json(error._message, 400)
    }
})

api.put('/:brandId', async (c) => {
    const _id = c.req.param('brandId')
    const body = await c.req.json()
    const q = {
        _id
    }
    const updateQuery = {
        ...body
    }
    const tryToUpdate = await Brands.findOneAndUpdate(q, updateQuery, { new: true })
    return c.json(tryToUpdate, 200)

})
api.patch('/:brandId', async (c) => {
    const _id = c.req.param('brandId')
    const body = await c.req.json()
    const q = {
        _id
    }
    const { brand, ...rest } = body

    const updateQuery = {
        $addToSet: {
            brand: brand
        },
        $set: { ...rest }
    }
    const tryToUpdate = await Brands.findOneAndUpdate(q, updateQuery, { new: true })
    return c.json(tryToUpdate, 200)

})

api.delete('/:brandId', async (c) => {
    const _id = c.req.param('brandId')
    const tryToDelete = await Brands.deleteOne({ _id })
    const { deletedCount } = tryToDelete
    if (deletedCount) {
        return c.json({ msg: "DELETE done" })
    }
    return c.json({ msg: "not found" }, 404)

})

export default api