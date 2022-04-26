import pkg from 'mongoose';
const { Schema, model } = pkg;


const roleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export default model('Role', roleSchema)