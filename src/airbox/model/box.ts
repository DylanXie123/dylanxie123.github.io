export default interface Box extends BoxWithoutId {
  id: string;
}

export interface BoxWithoutId {
  content: string;

  boxType: string;

  refId?: string;

  refUrl?: string;
}
