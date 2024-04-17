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
const express_1 = __importDefault(require("express"));
const realisateurRoutes_1 = __importDefault(require("./routes/realisateurRoutes"));
const filmRoutes_1 = __importDefault(require("./routes/filmRoutes"));
const seanceRoutes_1 = __importDefault(require("./routes/seanceRoutes"));
const Port = 5000;
const app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
app.use(express_1.default.json());
app.use('/api/realisateur', realisateurRoutes_1.default);
app.use('/api/film', filmRoutes_1.default);
app.use('/api/seance', seanceRoutes_1.default);
const uri = "mongodb+srv://fatma:Mokranifatma22@cluster0.dcxt85w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
            yield mongoose_1.default.connect(uri);
            yield mongoose_1.default.connection.db.admin().command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        catch (_a) {
            console.log(Error);
        }
    });
}
run().catch(console.dir);
app.listen(Port, () => {
    console.log(`serveur running on port ${Port}`);
});
