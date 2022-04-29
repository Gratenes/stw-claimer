import example from './random/exaple.js';
import itmes from './random/items.js';
declare global {
  type publicService = typeof example.publicService;
  type publicAccount = typeof example.publicAccount;
  type items = typeof itmes;
}