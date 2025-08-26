import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { Category } from './category.models';

@Injectable()
export class CategoryService {
  public categories: Category[] = [
    {
      categoryId: 1,
      name: 'electricidad',
      description: 'Instalación, mantenimiento y reparación de sistemas eléctricos',
      visibilityState: true,
    },
    {
      categoryId: 2,
      name: 'Plomeria',
      description: 'Solución de fugas, instalaciones y mantenimiento de redes de agua y desagüe',
      visibilityState: true,
    },
    {
      categoryId: 3,
      name: 'Carpinteria',
      description: 'Diseño, reparación y armado de muebles',
      visibilityState: true,
    },
    // {
    //   categoryId: 4,
    //   name: 'Reparaciones',
    //   description: 'Arreglo y mantenimiento de equipos, muebles o estructuras del hogar y oficina.',
    //   visibilityState: true,
    // },
    // {
    //   categoryId: 5,
    //   name: 'Cerrajería',
    //   description: 'Apertura de puertas, cambio de cerraduras y sistemas de seguridad.',
    //   visibilityState: true,
    // },
    // {
    //   categoryId: 6,
    //   name: 'Pintura',
    //   description: 'Aplicación y retoque de pintura en interiores y exteriores para renovar ambientes.',
    //   visibilityState: true,
    // },
    // {
    //   categoryId: 7,
    //   name: 'Jardinería',
    //   description: 'Diseño y mantenimiento de jardines, así como cuidado de plantas y paisajismo.',
    //   visibilityState: true,
    // },
    // {
    //   categoryId: 8,
    //   name: 'Otros',
    //   description: 'Servicios adicionales según tus necesidades específicas, adaptados a cada cliente.',
    //   visibilityState: true,
    // },
  ];

  findAll() {
    return this.categories.filter((category) => category.visibilityState === true);
  }

  //Para conferir las categorias vigentes (visibilityState:1) y las categorias eliminadas (visibilityState: 0)
  findAllForAdmin() {
    return this.categories;
  }

  findById(id: number) {
    const position = this.findOne(id);
    const categoryInformation = this.categories[position];
    return categoryInformation;
  }

  create(body: CreateCategoryDto) {
    const newCategory = {
      categoryId: this.categories.length + 1,
      name: body.name,
      description: body.description,
      visibilityState: true,
      //Por más q declares false, el programa fuerza q sea true pq se está creando
      //2)visibilityState: body.visibilityState ?? true,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  //La única forma de cambiar visibilityState es eliminando (lo convierte a false)
  delete(id: number) {
    const position = this.findOne(id);
    this.categories[position].visibilityState = false;
    return { message: `Categoría con ID ${id} eliminada correctamente` };
  }

  //N se puede cambiar el categoryId ni el visibilityState
  update(id: number, body: UpdateCategoryDto) {
    const position = this.findOne(id);
    const newCategory = {
      categoryId: this.categories[position].categoryId,
      name: body.name ?? this.categories[position].name,
      description: body.description ?? this.categories[position].description,
      visibilityState: this.categories[position].visibilityState,
    };
    this.categories[position] = newCategory;
    return newCategory;
  }

  private findOne(id: number) {
    const position = this.categories.findIndex((category) => category.categoryId === id);
    if (position === -1) {
      throw new NotFoundException(`La categoría con ID ${id} no fue encontrada`);
    }
    return position;
  }
}
