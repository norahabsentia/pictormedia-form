// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var clientSchema = mongoose.Schema({

        /*email        : String,
        name        : String,
        bundleId       : String,
        applicationId       : String,
        gameVersion       : String,
        gameVersionName       : String,
        gameId       : String,
        playerId       : String,
        gameTime     : String,
        inputAndroidCsvPath     : String,
        inputiosCsvPath     : String*/
        id: String,
	name: String,
	month: String,
	total_charges: String,
	recent_pmt_amt: String,
	recent_pmt_date: {
		date: String,
		month: String,
		year: String
	},
	overall_balance: String,
	min_payment: String,
	due_date: {
		date: String,
		month: String,
		year: String
	},
	points_earned_month: String,
	total_points_earned: String,
	expense_distribution: {
		food: String,
		entertainment: String,
		automobile: String,
		healthcare: String,
		merchandise: String
	}


});

// generating a hash
//userSchema.methods.generateHash = function(password) {
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};

// checking if password is valid
//userSchema.methods.validPassword = function(password) {
//    return bcrypt.compareSync(password, this.local.password);
//};

// create the model for users and expose it to our app
module.exports = mongoose.model('Client', clientSchema);

