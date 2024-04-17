import { Router, Request, Response } from "express";
import RealisateurModel from "../models/realisateur";


const router = Router();



router.get('/', async (req: Request, res: Response) => {
  try {
      const Realisateur = await RealisateurModel.find();

      res.status(200).json(Realisateur);
  } catch (error) {
      console.error('Erreur lors de la récupération des realisateur:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des realisateur' });
  }
});


router.post('/add', async (req: Request, res: Response) => {
    try {
        const { name, birthdate, biography } = req.body;
        const nouveauRealisateur = new RealisateurModel({
            
            name,
            birthdate,
            biography
        });
  
        const RealisateurEnregistre = await nouveauRealisateur.save();
        res.status(201).json({ message: 'Réalisateur ajouté avec succès', auteur: RealisateurEnregistre });
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un réalisateur :', error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du d\'réalisateur' });
    }
  });


  export default Router ; 