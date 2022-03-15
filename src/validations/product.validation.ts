import joi from 'joi';

type newProductType = {
    name: string,
    price: number,
    description: string,
    weight: number
}

const newProductSchema = joi.object({
    name: joi.string()
        .min(3)
        .max(64)
        .required(),

    price: joi.number()
        .required(),

    description: joi.string()
        .min(8)
        .max(255)
        .required(),

    weight: joi.number()
        .required()
});

export { newProductSchema, newProductType };