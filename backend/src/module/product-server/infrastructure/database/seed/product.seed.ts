import { faker } from '@faker-js/faker';
import { productDataSource, options } from '../data-source';
import { ProductEntity } from '../../../domain/product/product.entity';

async function create() {
    productDataSource.setOptions({
        ...options,
    });

    await productDataSource.initialize();

    const queryRunner = productDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const products: Partial<ProductEntity>[] = [];

        for (let i = 0; i < 50; i++) {
            products.push({
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                image_url: faker.image.urlPicsumPhotos({
                    width: 640,
                    height: 480,
                }),
                price: Number(faker.commerce.price({
                    min: 100,
                    max: 10000,
                    dec: 2,
                })),
            });
        }

        const createdProducts = await queryRunner.manager.save(
            ProductEntity,
            products,
        );

        console.log(createdProducts);

        await queryRunner.commitTransaction();

        console.info('✅ Products seeded successfully');
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('❌ Something went wrong:', error);
    } finally {
        await queryRunner.release();
        await productDataSource.destroy();
    }
}

void create();