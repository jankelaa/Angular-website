import mongoose  from "mongoose";

const Schema = mongoose.Schema;

let Purchase_request = new Schema ({
    grad:{
        type: String
    },
    opstina:{
        type: String
    },
    ulica:{
        type: String
    },
    broj:{
        type:Number
    },
    stan:{
        type: Number
    },
    tip:{
        type:String
    },
    cena:{
        type:Number
    },
    vlasnik:{
        type:String
    },
    kupac:{
        type: String
    },
    potvrda:{
        type: String
    }

})

export default mongoose.model('purchase_request', Purchase_request, 'purchase_requests')