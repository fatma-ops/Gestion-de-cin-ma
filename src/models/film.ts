import mongoose, { Schema, Document } from 'mongoose';
import { IDirector } from './realisateur';

export interface IFilm extends Document { 
    title: string; 
    releaseYear: number; 
    genre: string; 
    directors: IDirector[];
    }

const FilmSchema : Schema = new Schema ({
    title: {type : String},
    releaseYear: {type : Number}, 
    genre: {type : String},
    directors: {type: Schema.Types.ObjectId,ref:'Directeur'},
    }
);
const FilmModel = mongoose.model<IFilm>('Film', FilmSchema);
export default FilmModel;
