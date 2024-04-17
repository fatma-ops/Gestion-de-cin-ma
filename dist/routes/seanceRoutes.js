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
const film_1 = __importDefault(require("../models/film"));
const seance_1 = __importDefault(require("../models/seance"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seance = yield seance_1.default.find();
        res.status(200).send(seance);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des séances:', error);
        res.status(500).send({ message: 'Erreur lors de la récupération des séances' });
    }
}));
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { film, date, time, availableSeats } = req.body;
        const existingFilm = yield film_1.default.findById(film);
        if (!existingFilm) {
            return res.status(404).json({ error: 'Film non trouvé' });
        }
        const nouveauSession = new seance_1.default({
            film: film,
            date,
            time,
            availableSeats
        });
        yield nouveauSession.save();
        return res.status(201).json({ session: nouveauSession });
    }
    catch (error) {
        console.error('Erreur lors de l\'ajout dune session:', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout d\' une session' });
    }
}));
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { film, date, time, availableSeats } = req.body;
        // Vérifier si le film existe
        const existingFilm = yield film_1.default.findById(film);
        if (!existingFilm) {
            return res.status(404).json({ error: 'Film non trouvé' });
        }
        const updatedSession = yield seance_1.default.findByIdAndUpdate(id, {
            film: film,
            date: date,
            time: time,
            availableSeats: availableSeats
        }, { new: true });
        if (!updatedSession) {
            return res.status(404).json({ error: 'Session non trouvée' });
        }
        return res.status(200).json({ message: 'Session mise à jour avec succès', session: updatedSession });
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour de la session :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la session' });
    }
}));
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedSession = yield seance_1.default.findByIdAndDelete(req.params.id);
        if (deletedSession) {
            res.status(200).json({ message: 'seance supprimé avec succès' });
        }
        else {
            res.status(404).json({ error: 'seance introuvable' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression ' });
    }
}));
exports.default = router;
