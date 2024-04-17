import { Router, Request, Response } from "express";
import FilmModel from "../models/film";
import SeanceModel , {ISession} from "../models/seance";

const router = Router();



router.get('/', async (req: Request, res: Response) => {
  try {
      const seance = await SeanceModel.find();

      res.status(200).send(seance);
  } catch (error) {
      console.error('Erreur lors de la récupération des séances:', error);
      res.status(500).send({ message: 'Erreur lors de la récupération des séances' });
  }
});


router.post('/add', async (req: Request, res: Response) => {

    try {
       const { film ,date , time ,availableSeats } = req.body;
 
       
       const existingFilm= await FilmModel.findById(film);
       if (!existingFilm) {
          return res.status(404).json({ error: 'Film non trouvé' });
       }
 
       const nouveauSession: ISession = new SeanceModel({
        film:film,
        date,
        time ,
        availableSeats
       });
 
       await nouveauSession.save();
 
 
       return res.status(201).json({ session: nouveauSession });
    } catch (error) {
       console.error('Erreur lors de l\'ajout dune session:', error);
       return res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout d\' une session' });
    }
 });

 router.put('/update/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { film, date, time, availableSeats } = req.body;

        // Vérifier si le film existe
        const existingFilm = await FilmModel.findById(film);
        if (!existingFilm) {
            return res.status(404).json({ error: 'Film non trouvé' });
        }

        const updatedSession = await SeanceModel.findByIdAndUpdate(id, {
            film: film,
            date: date,
            time: time,
            availableSeats: availableSeats
        }, { new: true }); 
        if (!updatedSession) {
            return res.status(404).json({ error: 'Session non trouvée' });
        }

        return res.status(200).json({ message: 'Session mise à jour avec succès', session: updatedSession });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la session :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la session' });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedSession= await SeanceModel.findByIdAndDelete(req.params.id);
      if (deletedSession) {
        res.status(200).json({ message: 'seance supprimé avec succès' });
      } else {
        res.status(404).json({ error: 'seance introuvable' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression ' });
    }
  });




export default router ;