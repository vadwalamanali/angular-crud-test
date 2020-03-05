import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TestData implements InMemoryDbService {
  createDb() {
    let countryDetails = [
      { id: 101, country: 'India', state: 'Gujarat',city:'vadodara' },
      { id: 102, country: 'India', state: 'Maharastra',city:'Mumbai' },
    ];
    return { country: countryDetails };
  }
}
