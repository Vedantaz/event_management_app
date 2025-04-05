import { Module} from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports:[
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', 
      signOptions: { expiresIn: '1h' },
    })
  ], 
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
  exports: [UploadService],
})

export class UploadModule {

}

