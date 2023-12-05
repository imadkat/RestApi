import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  describe('create', () => {
    it('should create a product', async () => {
      const productBody = {
        name: 'Test Product',
        description: 'Test Description',
      };
      const createdProduct = new Product();
      Object.assign(createdProduct, productBody);

      jest.spyOn(productRepository, 'create').mockReturnValue(createdProduct);
      jest.spyOn(productRepository, 'save').mockResolvedValue(createdProduct);

      const result = await productService.create(productBody);

      expect(productRepository.create).toHaveBeenCalledWith(productBody);
      expect(productRepository.save).toHaveBeenCalledWith(createdProduct);
      expect(result).toEqual(createdProduct);
    });
  });

  describe('findAll', () => {
    it('should find products by name', async () => {
      const name = 'Test Product';
      const products = [{ name, description: 'Test Description' }] as Product[];

      jest.spyOn(productRepository, 'findBy').mockResolvedValue(products);

      const result = await productService.findAll(name);

      expect(productRepository.findBy).toHaveBeenCalledWith({ name });
      expect(result).toEqual(products);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const id = '1';
      const reqBody = { name: 'Updated Product' };
      const existingProduct = {
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
      } as Product;
      const updatedProduct = { ...existingProduct, ...reqBody };

      jest.spyOn(productService, 'findOne').mockResolvedValue(existingProduct);
      jest.spyOn(productRepository, 'save').mockResolvedValue(updatedProduct);

      const result = await productService.update(id, reqBody);

      expect(productService.findOne).toHaveBeenCalledWith(id);
      expect(productRepository.save).toHaveBeenCalledWith(updatedProduct);
      expect(result).toEqual(updatedProduct);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const id = '2';
      const reqBody = { name: 'Updated Product' };

      jest.spyOn(productService, 'findOne').mockResolvedValue(null);

      await expect(productService.update(id, reqBody)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const id = '1';
      const existingProduct = {
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
      } as Product;

      jest.spyOn(productService, 'findOne').mockResolvedValue(existingProduct);
      jest
        .spyOn(productRepository, 'remove')
        .mockResolvedValue(existingProduct);

      const result = await productService.remove(id);

      expect(productService.findOne).toHaveBeenCalledWith(id);
      expect(productRepository.remove).toHaveBeenCalledWith(existingProduct);
      expect(result).toEqual(existingProduct);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const id = '2';

      jest.spyOn(productService, 'findOne').mockResolvedValue(null);

      await expect(productService.remove(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
