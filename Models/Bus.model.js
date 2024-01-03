const mongoose = require("mongoose");

const busSchema = mongoose.Schema({
    bus_name:{type:String},
    bus_model:{type:String},
    pick_up_time:{type:String},
    drop_time:{type:String},
    duration:{type:String},
    rating:{type:Number},
    total_seat:{type:Number},
    price:{type:Number},
    seat_available:{type:Number},
    seat_type:{type:String},
    pickup_address:{type:String},
    drop_address:{type:String},
    passengers:[{type:String}],
    features:[{type:String}],
    travel_name:{type:String}
});

const BusModel = mongoose.model("bus", busSchema);

module.exports = {BusModel};