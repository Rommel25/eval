import { IFlippers } from "./flippers";
import { Schema, model, Types } from 'mongoose';


interface IBrands {
    name: string;
    description: string;
    logo: IPictures;
    flippers: Types.ObjectId[];

}

const brandsSchema = new Schema<IBrands>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: Types.ObjectId, ref: 'pictures' },
    flippers: [{type: Types.ObjectId, ref: "flippers"}]
});

const Brands = model<IBrands>('brands', brandsSchema);
export { Brands, IBrands }
