import { action, computed, makeObservable, observable } from "mobx";
import React from "react";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import ContentModel, { createContentModel } from "./contentModel";
import { decrypt } from "../../login/auth";

export default class AirBoxModel {
  @observable
  private models: ContentModel[] = [];

  @observable
  private updatingItem: number = -1;

  private supabase!: SupabaseClient;

  constructor() {
    makeObservable(this);
    this.initSupabase();
  }

  private initSupabase = () => {
    const options = {
      schema: 'public',
      headers: { 'x-my-custom-header': 'airbox' },
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
    this.supabase = createClient(
      decrypt(process.env.REACT_APP_SUPABASE_URL!),
      decrypt(process.env.REACT_APP_SUPABASE_KEY!),
      options
    );
  }

  createText = async (text: string) => {
    const modelItem = createContentModel(text, 'text/plain');
    const undoFn = this.insertModel(modelItem);
    const dbResult = await this.insertDB(modelItem);
    if (dbResult !== false) {
      return true;
    } else {
      undoFn();
      return false;
    }
  }

  @action
  createFile = (file: File) => {
    // this.status = "loading";
    // const savedFile = await file.save();

    // return this.create({
    //   content: savedFile.name(),
    //   boxType: box.type,
    //   refId: savedFile.id,
    //   refUrl: savedFile.url(),
    // })
  }

  @action
  private insertModel = (item: ContentModel) => {
    const insertIndex = 0;
    this.models.splice(insertIndex, 0, item);
    this.updatingItem = insertIndex;

    const undoFn = () => {
      this.models.splice(insertIndex, 1);
      this.updatingItem = -1;
    }

    return action(undoFn);
  }

  private insertDB = async (item: ContentModel) => {
    try {
      const { data, error } = await this.supabase
        .from<ContentModel>('contents')
        .insert(item);
      if (error === null) return data.map(this.db2model);
    } catch (_) { }
    return false;
  }

  @action
  removeItem = async (uuid: string) => {
    const removeIndex = this.models.findIndex(v => v.id === uuid);
    if (removeIndex > -1) {
      const undoFn = this.removeModel(removeIndex);
      const dbResult = await this.removeDB(uuid);
      if (dbResult === true) {
        return true;
      } else {
        undoFn();
        return false;
      }
    }
  }

  @action
  private removeModel = (removeIndex: number) => {
    const modelItem = this.models[removeIndex];
    this.models.splice(removeIndex, 1);
    this.updatingItem = removeIndex;

    const undoFn = () => {
      this.models.splice(removeIndex, 0, modelItem);
      this.updatingItem = -1;
    }

    return action(undoFn);
  }

  private removeDB = async (id: string) => {
    try {
      const { error } = await this.supabase
        .from('contents')
        .delete()
        .match({ id: id });
      if (error === null) return true;
    } catch (_) { }
    return false;
  }

  @action
  retrieve = async () => {
    this.updatingItem = 0;
    const { data, error } = await this.supabase
      .from('contents')
      .select();
    this.updatingItem = -1;
    if (error === null) {
      this.models = data.map(this.db2model);
      return true;
    } else {
      return false;
    }
  }

  private db2model(dbItem: any): ContentModel {
    console.log(dbItem)
    return {
      ...dbItem,
      createdDate: Date.parse(dbItem.createdDate),
    };
  }

  @computed get getModels() {
    return this.models;
  }

  @computed get getUpdatingItem() {
    return this.updatingItem;
  }
}

const airBoxModel = new AirBoxModel();
export const AirBoxModelContext = React.createContext<AirBoxModel>(airBoxModel);
