export default interface Box extends BoxWithoutId {
  id: string;
}

export interface BoxWithoutId {
  content: string;

  boxType: BoxType;
}

export enum BoxType {
  Text = 'Text',
  Image = 'Image',
  URL = 'URL',
  File = 'File',
}