import { Router, Request, Response } from "express";
import FilmModel from "../models/film";
import RealisateurModel from "../models/realisateur";


const router = Router();



router.get('/', async (req: Request, res: Response) => {
  try {
      const Film = await FilmModel.find();

      res.status(200).send(Film);
  } catch (error) {
      console.error('Erreur lors de la récupération des realisateur:', error);
      res.status(500).send({ message: 'Erreur lors de la récupération des realisateur' });
  }
});



router.post('/add', async (req: Request, res: Response) => {
    try {
     const { title, releaseYear, genre, directors } = req.body; 

    const existingDirectors = await Promise.all(
     directors.map(async (directorId: string) => {
        const director = await RealisateurModel.findById(directorId);
        return director;
    })
);
if (existingDirectors.some((director) => !director)) {
    return res.status(404).send({ message: 'Un ou plusieurs réalisateurs n\'existent pas' });
}
     
  
        const nouveauFilm = new FilmModel({
            title,
            releaseYear,
            genre,
            directors 
            
        });
  
        const FilmEnregistre = await nouveauFilm.save();
  
        res.status(201).send({ message: 'Réalisateur ajouté avec succès', film: FilmEnregistre });
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un film :', error);
        res.status(500).send({ message: 'Erreur lors de l\'ajout du d\'un film' });
    }
  });



  router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedFilm= await FilmModel.findByIdAndDelete(req.params.id);
      if (deletedFilm) {
        res.status(200).json({ message: 'film supprimé avec succès' });
      } else {
        res.status(404).json({ error: 'film introuvable' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression ' });
    }
  });



  router.put('/update/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { title, releaseYear, genre, directors } = req.body;

        const existingFilm = await FilmModel.findById(id);
        if (!existingFilm) {
            return res.status(404).send({ message: 'Film introuvable' });
        }

        const existingDirectors = await Promise.all(
            directors.map(async (directorId: string) => {
                const director = await RealisateurModel.findById(directorId);
                return director;
            })
        );

        if (existingDirectors.some((director) => !director)) {
            return res.status(404).send({ message: 'Un ou plusieurs réalisateurs n\'existent pas' });
        }

        existingFilm.title = title;
        existingFilm.releaseYear = releaseYear;
        existingFilm.genre = genre;
        existingFilm.directors = directors;

        const filmMisAJour = await existingFilm.save();

        res.status(200).send({ message: 'Film mis à jour avec succès', film: filmMisAJour });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du film :', error);
        res.status(500).send({ message: 'Erreur lors de la mise à jour du film' });
    }
});








  export default router ; 