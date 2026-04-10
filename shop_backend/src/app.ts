letimport express from 'express';
import { connectDB } from './database/mongoose';
import authRoutes from "./modules/auth/auth.route";
import categoryRoutes from "./modules/category/category.route";
import productRoutes from "./modules/product/product.route";
import productVariantRoutes from "./modules/product/productVariant.route";
import orderRoutes from "./modules/order/order.route";
const app = express();
connectDB();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api', productVariantRoutes);
app.use('/api/orders', orderRoutes);

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Shop Backend API',
			version: '1.0.0',
			description: 'API documentation for Shop Backend',
		},
		servers: [
			{
				url: 'http://localhost:3000',
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [{ bearerAuth: [] }],
	},
	apis: ['./src/modules/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;