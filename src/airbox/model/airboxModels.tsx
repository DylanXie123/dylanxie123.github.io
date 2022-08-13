import { action, computed, makeObservable, observable } from "mobx";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import ContentModel, { createContentModel } from "./contentModel";
import { decrypt } from "../../login/auth";
import React, { useContext } from "react";

export default class AirBoxModel {
  @observable
  private models: ContentModel[] = [];

  @observable
  private updatingItemID: string | null = null;

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
    return this.createModel(modelItem);
  }

  createFile = async (file: File) => {
    const tempModel = createContentModel(file.name, 'text/plain');
    const { undoFn } = this.insertModel(tempModel);
    const insertFileResult = await this.insertStorage(file);
    undoFn();
    if (insertFileResult !== false) {
      const { path, publicURL } = insertFileResult;
      const modelItem = createContentModel(path, file.type, publicURL)
      return this.createModel(modelItem);
    } else {
      return false;
    }
  }

  private createModel = async (modelItem: ContentModel) => {
    const { finishFn, undoFn } = this.insertModel(modelItem);
    const dbResult = await this.insertDB(modelItem);
    if (dbResult !== false) {
      finishFn();
      return true;
    } else {
      undoFn();
      return false;
    }
  }

  @action
  private insertModel = (item: ContentModel) => {
    const insertIndex = 0;
    this.models.splice(insertIndex, 0, item);
    this.updatingItemID = item.id;

    const finishFn = () => {
      this.updatingItemID = null;
    }

    const undoFn = () => {
      this.models.splice(insertIndex, 1);
      this.updatingItemID = null;
    }

    return {
      finishFn: action(finishFn),
      undoFn: action(undoFn),
    };
  }

  private insertDB = async (item: ContentModel) => {
    try {
      const { data } = await this.supabase
        .from<ContentModel>('contents')
        .insert(item);
      if (data !== null) return data.map(this.db2model);
    } catch (_) { }
    return false;
  }

  private insertStorage = async (file: File) => {
    try {
      const { data } = await this.supabase
        .storage
        .from('airbox-storage')
        .upload(file.name, file);
      if (data !== null) {
        const { publicURL } = this.supabase
          .storage
          .from('airbox-storage')
          .getPublicUrl(file.name)
        if (publicURL !== null) return {
          path: file.name,
          publicURL,
        };
      }
    } catch (_) { }
    return false;
  }

  removeItem = async (uuid: string) => {
    const removeIndex = this.models.findIndex(v => v.id === uuid);
    if (removeIndex > -1) {
      const modelItem = this.models[removeIndex];
      const { finishFn, undoFn } = this.removeModel(removeIndex);
      const dbResult = await this.removeDB(uuid);
      let storageResult = true;
      if (modelItem.refUrl) {
        storageResult = await this.removeStorage(modelItem.content);
      }
      if (dbResult === true && storageResult === true) {
        finishFn();
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
    this.updatingItemID = modelItem.id;
    this.models.splice(removeIndex, 1);

    const finishFn = () => {
      this.updatingItemID = null;
    }

    const undoFn = () => {
      this.models.splice(removeIndex, 0, modelItem);
      this.updatingItemID = null;
    }

    return {
      finishFn: action(finishFn),
      undoFn: action(undoFn),
    };
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

  private removeStorage = async (path: string) => {
    try {
      const { data } = await this.supabase
        .storage
        .from('airbox-storage')
        .remove([path]);
      if (data !== null) return true;
    } catch (_) {
    }
    return false;
  }

  @action
  retrieve = async () => {
    this.updatingItemID = '0';
    const { data } = await this.supabase
      .from('contents')
      .select()
      .order("createdDate", { ascending: false });
    this.updatingItemID = null;
    if (data !== null) {
      this.models = data.map(this.db2model);
      return true;
    } else {
      return false;
    }
  }

  private db2model(dbItem: any): ContentModel {
    return {
      ...dbItem,
      createdDate: Date.parse(dbItem.createdDate),
    };
  }

  @computed get getModels() {
    return this.models;
  }

  @computed get getUpdatingItemID() {
    return this.updatingItemID;
  }
}

export const AirBoxModelContext = React.createContext<AirBoxModel | null>(null);

export const useAirBoxModel = () => {
  const airBoxModel = useContext(AirBoxModelContext);
  if (airBoxModel === null) {
    throw new Error('useAirBoxModel must be used within a AirBoxModelContext.');
  } else {
    return airBoxModel;
  }
}