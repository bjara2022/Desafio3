import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
	code: {
		type: String,
		require: true,
		unique: true,
	},
	price: {
		type: Number,
		require: true,
	},
	status: {
		type: Boolean,
		require: false,
		default: true,
	},
	stock: {
		type: Number,
		require: true,
	},
	category: {
		type: String,
		require: true,
	},
	thumbnails: {
		type: Array,
		require: false,
	},
});

schema.plugin(mongoosePaginate);

export const productModel = mongoose.model('products', schema);
export default productModel;