
import mongoose, { Schema, Document } from 'mongoose';
import { IFilm } from './film';

export interface ISession  extends Document{ 
    film: IFilm; 
    date: Date; 
    time: string; 
    availableSeats: number;
    }

const SeanceSchema : Schema = new Schema ({
    film: {type: Schema.Types.ObjectId , ref:'Film'}, 
    date: {type:Date },
    time: {type: String},
    availableSeats: {type : Number} , 
    
}); 
const SeanceModel = mongoose.model<ISession>('Session', SeanceSchema);


export default SeanceModel;
