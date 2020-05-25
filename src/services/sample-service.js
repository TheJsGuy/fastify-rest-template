import { Injectable } from "../../.lib";

@Injectable({
  name: 'sampleService'
})
export class SampleService {
  constructor() { }

  isActive = (...args) => {
    console.warn(...args);
    return { message: 'ACTIVE' };
  }
}
