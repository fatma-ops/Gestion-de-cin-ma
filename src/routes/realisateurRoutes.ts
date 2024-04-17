import { Router, Request, Response } from "express";
import RealisateurModel from "../models/realisateur";


const router = Router();



router.get('/', async (req: Request, res: Response) => {
  try {
      const Realisateur = await RealisateurModel.find();

      res.status(200).send(Realisateur);
  } catch (error) {
      console.error('Erreur lors de la récupération des realisateur:', error);
      res.status(500).send({ message: 'Erreur lors de la récupération des realisateur' });
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
  
        res.status(201).send({ message: 'Réalisateur ajouté avec succès', auteur: RealisateurEnregistre });
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un réalisateur :', error);
        res.status(500).send({ message: 'Erreur lors de l\'ajout du d\'réalisateur' });
    }
  });



  router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedRealisateur= await RealisateurModel.findByIdAndDelete(req.params.id);
      if (deletedRealisateur) {
        res.status(200).json({ message: 'Auteur supprimé avec succès' });
      } else {
        res.status(404).json({ error: 'Auteur introuvable' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression ' });
    }
  });

  router.put('/update/:id' , async (req , res) => {
    try {
      const id=req.params.id
      const { name, birthdate , biography } = req.body;
      console.log(name, birthdate , biography , id )
      const realisateur = await RealisateurModel.findByIdAndUpdate(id , {name, birthdate , biography},{new:true});
      if(realisateur){
        res.status(200).json(realisateur);
        } else {
          res.status(404).json({ error: 'realisateur introuvable' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour ' });
      }
    });










  export default router;