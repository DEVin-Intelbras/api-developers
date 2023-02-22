import { Controller } from '@nestjs/common';
import { RecruiterService } from '../services/recruiter.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('recruiters')
@Controller('recruiter')
export class RecruiterController {
  constructor(private recruiterService: RecruiterService) {}
}
