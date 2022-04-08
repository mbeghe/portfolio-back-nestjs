import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const port = process.env.PORT ? Number(process.env.PORT) : 80;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Portfolio backend')
    .setDescription('The portfolio backend server')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () =>
    console.log(
      `Portfolio server listening on port: ${port}`,
    ),
  );
}
bootstrap();
