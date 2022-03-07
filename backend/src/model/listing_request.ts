import mongoose  from "mongoose";

const Schema = mongoose.Schema;

let Listing_request = new Schema ({
    opis:{
        type: String
    },
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
    sprat:{
        type: Number
    },
    spratnost:{
        type: Number
    },
    kvadratura:{
        type:Number
    },
    br_soba:{
        type: Number
    },
    namestenost:{
        type: Boolean
    },
    cena:{
        type:Number
    },
    vlasnik:{
        type:String
    },
    promo:{
        type: Boolean
    },
    slike: {
        type: Array
    }

})

export default mongoose.model('listing_request', Listing_request, 'listing_requests')