import { v4 as uuidv4 } from 'uuid';

export default interface ContentModel {
  id: string;

  createdDate: Date;

  content: string;

  type: string;

  refUrl?: string;
}

export function createContentModel(
  content: string, type: string, refUrl?: string
): ContentModel {
  return {
    id: uuidv4(),
    createdDate: new Date(),
    content: content,
    type: type,
    refUrl: refUrl,
  }
}