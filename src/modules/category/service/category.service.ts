import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
// import { Category } from '../entities/category.models';
import { Category } from '../entities/category.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseCategoryDto } from '../dto/response-category.dto';

@Injectable()
export class CategoryService {
  //Para memoria local
  // public categories: Category[] = [
  //   {
  //     categoryId: 1,
  //     name: 'electricidad',
  //     description: 'Instalación, mantenimiento y reparación de sistemas eléctricos',
  //     visibilityState: true,
  //   },
  //   {
  //     categoryId: 2,
  //     name: 'Plomeria',
  //     description: 'Solución de fugas, instalaciones y mantenimiento de redes de agua y desagüe',
  //     visibilityState: true,
  //   },
  //   {
  //     categoryId: 3,
  //     name: 'Carpinteria',
  //     description: 'Diseño, reparación y armado de muebles',
  //     visibilityState: true,
  //   },
  //   // {
  //   //   categoryId: 4,
  //   //   name: 'Reparaciones',
  //   //   description: 'Arreglo y mantenimiento de equipos, muebles o estructuras del hogar y oficina.',
  //   //   visibilityState: true,
  //   // },
  //   // {
  //   //   categoryId: 5,
  //   //   name: 'Cerrajería',
  //   //   description: 'Apertura de puertas, cambio de cerraduras y sistemas de seguridad.',
  //   //   visibilityState: true,
  //   // },
  //   // {
  //   //   categoryId: 6,
  //   //   name: 'Pintura',
  //   //   description: 'Aplicación y retoque de pintura en interiores y exteriores para renovar ambientes.',
  //   //   visibilityState: true,
  //   // },
  //   // {
  //   //   categoryId: 7,
  //   //   name: 'Jardinería',
  //   //   description: 'Diseño y mantenimiento de jardines, así como cuidado de plantas y paisajismo.',
  //   //   visibilityState: true,
  //   // },
  //   // {
  //   //   categoryId: 8,
  //   //   name: 'Otros',
  //   //   description: 'Servicios adicionales según tus necesidades específicas, adaptados a cada cliente.',
  //   //   visibilityState: true,
  //   // },
  // ];
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  //Para memória local
  // findAll() {
  //   return this.categories.filter((category) => category.visibilityState === true);
  // }

  //Sin response-category.dto
  // async findAll() {
  //   return await this.categoryRepository.find({
  //     where: { enable: true },
  //   });
  // }

  //Con response-category.dto
  // async findAll() {
  //   const categories = await this.categoryRepository.find({
  //     where: { enable: true },
  //   });
  //   return categories.map((category) => {
  //     const responseCategory = new ResponseCategoryDto();
  //     responseCategory.categoryId = category.categoryId;
  //     responseCategory.name = category.name;
  //     return responseCategory;
  //   });
  // }

  async findAll(): Promise<ResponseCategoryDto[]> {
    const categories = await this.categoryRepository.find({
      where: { enable: true },
    });
    return categories.map((c) => ({
      categoryId: c.categoryId,
      name: c.name,
    }));
  }

  //Para conferir las categorias vigentes (visibilityState:1) y las categorias eliminadas (visibilityState: 0)
  // findAllForAdmin() {
  //   return this.categories;
  // }
  async findAllForAdmin() {
    return await this.categoryRepository.find();
  }

  //En memória local
  // findById(id: number) {
  //   const position = this.findOne(id);
  //   const categoryInformation = this.categories[position];
  //   return categoryInformation;
  // }

  //Sin response-category.dto
  // async findById(id: number) {
  //   const user = await this.findOne(id);
  //   return user;
  // }

  //Con response-category.dto
  async findById(id: number): Promise<ResponseCategoryDto> {
    const category = await this.findOne(id);
    return {
      categoryId: category.categoryId,
      name: category.name,
    };
  }

  //Para memória local
  // create(body: CreateCategoryDto) {
  //   const newCategory = {
  //     categoryId: this.categories.length + 1,
  //     name: body.name,
  //     description: body.description,
  //     visibilityState: true,
  //     //Por más q declares false, el programa fuerza q sea true pq se está creando
  //     //2)visibilityState: body.visibilityState ?? true,
  //   };
  //   this.categories.push(newCategory);
  //   return newCategory;
  // }

  //Sin response-category.dto
  // async create(body: CreateCategoryDto) {
  //   const newCategory = await this.categoryRepository.save({
  //     //categoryId: body.categoryId,  >> Se autogenera
  //     name: body.name,
  //     description: body.description,
  //     enable: true,
  //   });
  //   return newCategory;
  //   // return await this.categoryRepository.save(newCategory);
  // }

  //Con response-category.dto
  async create(body: CreateCategoryDto): Promise<ResponseCategoryDto> {
    const newCategory = await this.categoryRepository.save({
      //categoryId: body.categoryId,  >> Se autogenera
      name: body.name,
      description: body.description,
      enable: true,
    });
    return {
      categoryId: newCategory.categoryId,
      name: newCategory.name,
    };
  }

  //Para memoria local
  // delete(id: number) {
  //   const position = this.findOne(id);
  //   this.categories[position].visibilityState = false;
  //   return { message: `Categoría con ID ${id} eliminada correctamente` };
  // }

  async delete(id: number) {
    const category = await this.findOne(id);
    category.enable = false;
    await this.categoryRepository.save(category);
    return { message: `Categoría con ID ${id} eliminada correctamente` };
  }

  //Para memoria local
  // update(id: number, body: UpdateCategoryDto) {
  //   const position = this.findOne(id);
  //   const newCategory = {
  //     categoryId: this.categories[position].categoryId,
  //     name: body.name ?? this.categories[position].name,
  //     description: body.description ?? this.categories[position].description,
  //     visibilityState: this.categories[position].visibilityState,
  //   };
  //   this.categories[position] = newCategory;
  //   return newCategory;
  // }

  //Sin response-category.dto
  // async update(id: number, body: UpdateCategoryDto) {
  //   const category = await this.findOne(id);
  //   const updatedCategory = {
  //     categoryId: category.categoryId,
  //     name: body.name ?? category.name,
  //     description: body.description ?? category.description,
  //     enable: category.enable,
  //   };
  //   await this.categoryRepository.save(updatedCategory);
  //   return updatedCategory;
  // }

  //No puse con response-category.dto para q se vea descripcion si es q se actualizó
  async update(id: number, body: UpdateCategoryDto) {
    const category = await this.findOne(id);
    const updatedCategory = {
      categoryId: category.categoryId,
      name: body.name ?? category.name,
      description: body.description ?? category.description,
      enable: category.enable,
    };
    await this.categoryRepository.save(updatedCategory);
    return {
      categoryId: updatedCategory.categoryId,
      name: updatedCategory.name,
      description: updatedCategory.description,
    };
  }

  // private findOne(id: number) {
  //   const position = this.categories.findIndex((category) => category.categoryId === id);
  //   if (position === -1) {
  //     throw new NotFoundException(`La categoría con ID ${id} no fue encontrada`);
  //   }
  //   return position;
  // }
  private async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { categoryId: id },
    });
    if (!category) {
      throw new NotFoundException(`La categoría con ID ${id} no fue encontrada`);
    }
    return category;
  }
}
