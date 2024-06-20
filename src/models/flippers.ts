import { Schema, model,Types } from 'mongoose';
import { IBrands } from './brands';
interface IFlippers {
    name: string;
    description: string;
    quote: string;
    price: string;
    state: string;
    brand: IBrands;
    releaseDate: Date;
    grade: number;
    pictures:IPictures[];
    new?:boolean;
    hearth?: boolean;
    aviability: string;

}

const flippersSchema = new Schema<IFlippers>({
    name: { type: String, required: true },
    description:{ type: String, required: true },
    quote: { type: String, required: true },
    price: { type: String, required: true },
    state: { type: String, required: true },
    brand: { type: Types.ObjectId, ref: 'brand' },
    releaseDate:{type:Date, default: Date.now},
    grade: {type: Number, required:true},
    pictures: [{ type: Types.ObjectId, ref: 'pictures' }],
    new: {type: Boolean, required: true},
    hearth: {type: Boolean, required: true},
    aviability: {type:String, required:true},
});

const Flippers = model<IFlippers>('flippers', flippersSchema);
export {Flippers,IFlippers}
