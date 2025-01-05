import { Repository } from 'typeorm';
import { Art } from './entities/art.entity';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
export declare class ArtService {
    private artRepository;
    constructor(artRepository: Repository<Art>);
    create(createArtDto: CreateArtDto): Promise<Art>;
    findAll(): Promise<Art[]>;
    findOne(id: number): Promise<Art>;
    update(id: number, updateArtDto: UpdateArtDto): Promise<Art>;
    remove(id: number): Promise<void>;
}
