import { action, computed, makeObservable, observable } from "mobx";
import React from "react";
import LC from 'leanengine';
import Box, { BoxWithoutId, BoxType } from "./box";
import { decrypt } from "../../login/auth";

export type Status = "loading" | "error" | "done";

export default class AirBoxModel {
  @observable
  private models: Array<Box> = [];

  @observable
  private status: Status = "loading";

  private liveQuery: LC.LiveQuery<LC.Queriable> | undefined;

  constructor() {
    makeObservable(this);
    if (LC.applicationId === undefined || LC.applicationKey === undefined) {
      LC.init({
        appId: decrypt(process.env.REACT_APP_LEAN_AIRBOX_ID),
        appKey: decrypt(process.env.REACT_APP_LEAN_AIRBOX_KEY),
      });
    }
  }

  subscribe = async () => {
    const query = new LC.Query('AirBox');
    query.find()
      .then(boxes =>
        this.replace(boxes.map(items => this.db2model(items))))
      .then(() => {
        query.subscribe().then(liveQuery => {
          this.liveQuery = liveQuery;
          liveQuery.on('create', item => {
            if (item !== undefined) {
              const box = this.db2model(item);
              this.insert(box);
            }
          });
          liveQuery.on('delete', item => {
            if (item !== undefined) {
              this.remove(item.get('objectId') as string);
            }
          });
        });
      })
      .catch(action(() => { this.status = "error"; }));
  }

  unSubscribe = () => {
    this.liveQuery?.unsubscribe();
  }

  @action
  private replace = (items: Array<Box>) => {
    this.models = items;
    this.status = "done";
  }

  @action
  private insert = (item: Box) => {
    this.models.push(item);
    this.status = "done";
  }

  @action
  private remove = (id: string) => {
    const index = this.models.findIndex((model) => model.id === id);
    if (index > -1) {
      this.models.splice(index, 1);
    }
    this.status = "done";
  }

  private db2model(record: LC.Queriable): Box {
    return {
      id: record.get('objectId') as string,
      content: record.get('content') as string,
      boxType: BoxType[record.get('content') as keyof typeof BoxType],
    };
  }

  create = (box: BoxWithoutId) => {
    action(() => this.status = "loading");
    const AirBoxDB = LC.Object.extend('AirBox');
    const airBoxDB = new AirBoxDB();
    airBoxDB.set('content', box.content);
    airBoxDB.set('boxType', BoxType[box.boxType]);
    return airBoxDB.save();
  }

  delete = (id: string) => {
    action(() => this.status = "loading");
    const airBoxDB = LC.Object.createWithoutData('AirBox', id);
    airBoxDB.destroy();
  }

  @computed get boxes() {
    return this.models;
  }

  @computed get getStatue() {
    return this.status;
  }

}

const airBoxModel = new AirBoxModel();
export const AirBoxModelContext = React.createContext<AirBoxModel>(airBoxModel);
