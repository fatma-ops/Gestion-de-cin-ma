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
const realisateur_1 = __importDefault(require("../models/realisateur"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Film = yield film_1.default.find();
        res.status(200).send(Film);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des realisateur:', error);
        res.status(500).send({ message: 'Erreur lors de la récupération des realisateur' });
    }
}));
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, releaseYear, genre, directors } = req.body;
        const existingDirectors = yield Promise.all(directors.map((directorId) => __awaiter(void 0, void 0, void 0, function* () {
            const director = yield realisateur_1.default.findById(directorId);
            return director;
        })));
        if (existingDirectors.some((director) => !director)) {
            return res.status(404).send({ message: 'Un ou plusieurs réalisateurs n\'existent pas' });
        }
        const nouveauFilm = new film_1.default({
            title,
            releaseYear,
            genre,
            directors
        });
        const FilmEnregistre = yield nouveauFilm.save();
        res.status(201).send({ message: 'Réalisateur ajouté avec succès', film: FilmEnregistre });
    }
    catch (error) {
        console.error('Erreur lors de l\'ajout d\'un film :', error);
        res.status(500).send({ message: 'Erreur lors de l\'ajout du d\'un film' });
    }
}));
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedFilm = yield film_1.default.findByIdAndDelete(req.params.id);
        if (deletedFilm) {
            res.status(200).json({ message: 'film supprimé avec succès' });
        }
        else {
            res.status(404).json({ error: 'film introuvable' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression ' });
    }
}));
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, releaseYear, genre, directors } = req.body;
        const existingFilm = yield film_1.default.findById(id);
        if (!existingFilm) {
            return res.status(404).send({ message: 'Film introuvable' });
        }
        const existingDirectors = yield Promise.all(directors.map((directorId) => __awaiter(void 0, void 0, void 0, function* () {
            const director = yield realisateur_1.default.findById(directorId);
            return director;
        })));
        if (existingDirectors.some((director) => !director)) {
            return res.status(404).send({ message: 'Un ou plusieurs réalisateurs n\'existent pas' });
        }
        existingFilm.title = title;
        existingFilm.releaseYear = releaseYear;
        existingFilm.genre = genre;
        existingFilm.directors = directors;
        const filmMisAJour = yield existingFilm.save();
        res.status(200).send({ message: 'Film mis à jour avec succès', film: filmMisAJour });
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour du film :', error);
        res.status(500).send({ message: 'Erreur lors de la mise à jour du film' });
    }
}));
exports.default = router;
