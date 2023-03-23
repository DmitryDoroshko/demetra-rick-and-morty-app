export interface ICharacter {
  id: number;
  name: string;
  species: string;
  gender?: string;
  origin?: {
    name: string;
    url?: string;
  };
  status?: string;
  type?: string;
  image: string;
}