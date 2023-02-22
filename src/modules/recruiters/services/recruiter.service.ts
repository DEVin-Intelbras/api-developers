import { Injectable } from '@nestjs/common';
import { RecruiterRepository } from '../recruiter.repository';

@Injectable()
export class RecruiterService {
  constructor(private readonly recruiterRepository: RecruiterRepository) {}
}
