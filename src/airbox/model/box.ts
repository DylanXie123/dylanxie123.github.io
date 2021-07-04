export default class Box {
  id: string;

  content: string;

  constructor({id, content}: {id: string, content: string}) {
    this.id = id;
    this.content = content;
  }

}

export enum BoxType {
  Text,
  Image,
  URL,
  File,
}