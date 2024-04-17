"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const realisateur_1 = __importDefault(require("../models/realisateur"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Realisateur = yield realisateur_1.default.find();
        res.status(200).send(Realisateur);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des realisateur:', error);
        res.status(500).send({ message: 'Erreur lors de la récupération des realisateur' });
    }
}));
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, birthdate, biography } = req.body;
        const nouveauRealisateur = new realisateur_1.default({
            name,
            birthdate,
            biography
        });
        const RealisateurEnregistre = yield nouveauRealisateur.save();
        res.status(201).send({ message: 'Réalisateur ajouté avec succès', auteur: RealisateurEnregistre });
    }
    catch (error) {
        console.error('Erreur lors de l\'ajout d\'un réalisateur :', error);
        res.status(500).send({ message: 'Erreur lors de l\'ajout du d\'réalisateur' });
    }
}));
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedRealisateur = yield realisateur_1.default.findByIdAndDelete(req.params.id);
        if (deletedRealisateur) {
            res.status(200).json({ message: 'Auteur supprimé avec succès' });
        }
        else {
            res.status(404).json({ error: 'Auteur introuvable' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression ' });
    }
}));
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, birthdate, biography } = req.body;
        console.log(name, birthdate, biography, id);
        const realisateur = yield realisateur_1.default.findByIdAndUpdate(id, { name, birthdate, biography }, { new: true });
        if (realisateur) {
            res.status(200).json(realisateur);
        }
        else {
            res.status(404).json({ error: 'realisateur introuvable' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour ' });
    }
}));
exports.default = router;
