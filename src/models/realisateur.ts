import mongoose, { Schema, Document } from 'mongoose';

export interface IDirector extends Document { 
    name: string; 
    birthDate: Date; 
    biography: string;
    }

    const RealisateurSchema: Schema = new Schema({
        name: { type: String},
        birthDate: { type:Date },
        biography: { type: String},


     });
     
     const RealisateurModel = mongoose.model<IDirector>('Realisateur', RealisateurSchema);
     
     export default RealisateurModel;
     
     
