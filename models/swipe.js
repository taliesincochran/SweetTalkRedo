const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const swipeSchema = new Schema({
	swiper: {
		type: String,
		required: true
	},
	swipee: {
		type: String,
		required: true
	},
	swipe: {
		type: Boolean,
		required: true
	}
});
const Swipe = mongoose.modal('Swipe', swipeSchema);
module.exports = Swipe;