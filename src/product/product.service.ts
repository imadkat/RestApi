import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  // Service method for inserting new product row to the db.
  create(productBody: Partial<Product>) {
    const product = this.productRepository.create(productBody);
    return this.productRepository.save(product);
  }

  async findAll(name: string) {
    const products = await this.productRepository.findBy({ name });
    return products;
  }

  // Service method for getting a specific product by id
  async findOne(id: string) {
    const product = await this.productRepository.findBy({ id: Number(id) });
    return product[0];
  }

  // Service method for updating the product by id
  async update(id: string, reqBody: Partial<Product>) {
    const product = await this.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product Not Found with id: ${id}`);
    }

    Object.keys(reqBody).forEach((key) => {
      product[key] = reqBody[key];
    });

    return await this.productRepository.save(product);
  }

  // Service method for deleting the product by id
  async remove(id: string) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product Not Found with id: ${id}`);
    }
    return this.productRepository.remove(product);
  }
}
