/**
 * Interface for wrapped API response
 */
export interface ApiWrapper {
  count: number;
  next: string;
  previous: string;
  results: Array<any>;
}
