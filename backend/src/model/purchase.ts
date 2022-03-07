import mongoose  from "mongoose";

const Schema = mongoose.Schema;

let Purchase = new Schema ({    
    kupac:{
        type: String
    },
    vlasnik:{
        type: String
    },
    cena:{
        type:Number
    },
    tip:{
        type:String
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
    }
})

export default mongoose.model('purchase', Purchase, 'purchases')