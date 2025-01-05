"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const art_entity_1 = require("./entities/art.entity");
let ArtService = class ArtService {
    constructor(artRepository) {
        this.artRepository = artRepository;
    }
    async create(createArtDto) {
        const newArt = this.artRepository.create(createArtDto);
        newArt.inStock = createArtDto.quantity > 0;
        return this.artRepository.save(newArt);
    }
    async findAll() {
        return this.artRepository.find();
    }
    async findOne(id) {
        const art = await this.artRepository.findOne({ where: { id } });
        if (!art) {
            throw new common_1.NotFoundException(`Art with ID ${id} not found`);
        }
        return art;
    }
    async update(id, updateArtDto) {
        const art = await this.findOne(id);
        const updatedArt = this.artRepository.merge(art, updateArtDto);
        updatedArt.inStock = updatedArt.quantity > 0;
        return this.artRepository.save(updatedArt);
    }
    async remove(id) {
        const art = await this.findOne(id);
        await this.artRepository.remove(art);
    }
};
exports.ArtService = ArtService;
exports.ArtService = ArtService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(art_entity_1.Art)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArtService);
//# sourceMappingURL=art.service.js.map