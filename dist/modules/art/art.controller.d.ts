import { ArtService } from './art.service';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
export declare class ArtController {
    private readonly artService;
    constructor(artService: ArtService);
    create(createArtDto: CreateArtDto): Promise<import("./entities/art.entity").Art>;
    findAll(): Promise<import("./entities/art.entity").Art[]>;
    findOne(id: number): Promise<import("./entities/art.entity").Art>;
    update(id: number, updateArtDto: UpdateArtDto): Promise<import("./entities/art.entity").Art>;
    remove(id: number): Promise<void>;
}
