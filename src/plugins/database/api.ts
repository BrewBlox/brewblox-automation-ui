import Vue from 'vue';

import { deserialize } from '@/plugins/spark/parse-object';
import { StoreObject } from '@/shared-types';

import { ChangeCb, DeleteCb } from './types';

export interface DatabaseApi<T extends StoreObject> {
  subscribe(onChanged: ChangeCb<T>, onDeleted: DeleteCb): void;
  fetch(): Promise<T[]>;
  fetchById(id: string): Promise<T | null>;
  create(obj: T): Promise<T>;
  persist(obj: T): Promise<T>;
  remove(obj: T): Promise<T>;
}

export interface DatabaseApiArgs {
  /**
   * Collection identifier.
   */
  namespace: string;

  /**
   * Should incoming data be deserialized?
   * Defaults to false.
   */
  parsed?: boolean;
}

export function createApi<T extends StoreObject>(args: DatabaseApiArgs): DatabaseApi<T> {
  const hydrate: ((v: any) => any) = args.parsed ? deserialize : (v => v);
  const { namespace } = args;
  return {
    subscribe(onChanged: ChangeCb<T>, onDeleted: DeleteCb): void {
      Vue.$database.subscribe({
        namespace,
        onChanged: v => onChanged(hydrate(v)),
        onDeleted,
      });
    },
    async fetch(): Promise<T[]> {
      return hydrate(await Vue.$database.fetchAll(namespace));
    },
    async fetchById(id: string): Promise<T | null> {
      return hydrate(await Vue.$database.fetchById(namespace, id));
    },
    async create(val: T): Promise<T> {
      return hydrate(await Vue.$database.create(namespace, val));
    },
    async persist(val: T): Promise<T> {
      return hydrate(await Vue.$database.persist(namespace, val));
    },
    async remove(val: T): Promise<T> {
      return hydrate(await Vue.$database.remove(namespace, val));
    },
  };
}
