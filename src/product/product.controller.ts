import {
  Res,
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { ProductService } from './product.service';
import { Response } from 'express';
import { UpdateUserDto } from 'src/dtos/update-product.dto';

@Controller('api/v1/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  // Inserts new record to the db
  @Post()
  async createProduct(@Body() body: CreateProductDto, @Res() res: Response) {
    const product = await this.productService.create(body);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Product Created Successfully!',
      data: product,
    });
  }

  // Gets a specific product
  @Get('/:id')
  async findProduct(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product Not Found with id: ${id}`);
    }
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Product Found!',
      data: product,
    });
  }

  // Get All products based on the query parameter
  @Get()
  async getAllProducts(@Query('name') name: string, @Res() res: Response) {
    const products = await this.productService.findAll(name);
    const productsAmount = products.length;

    if (productsAmount === 0) {
      throw new NotFoundException(`Products Not Found`);
    }
    res.status(HttpStatus.OK).json({
      success: true,
      message: `${productsAmount} Products Found!`,
      data: products,
    });
  }

  // Updates a specific product by id
  @Patch('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() reqBody: UpdateUserDto,
    @Res() res: Response,
  ) {
    const product = await this.productService.update(id, reqBody);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Product Updated Successfully!',
      data: product,
    });
  }

  // Deletes a specific product id
  @Delete('/:id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productService.remove(id);
    res.status(HttpStatus.ACCEPTED).json({
      success: true,
      message: 'Product Deleted Successfully!',
      data: product,
    });
  }
}
