export interface stateIBGERegion {
  id: number;
  sigla: string;
  nome: string;
}

export interface stateIGBE {
  id: number;
  sigla: string;
  nome: string;
  regiao: stateIBGERegion;
}
