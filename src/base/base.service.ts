import { FindManyOptions, FindOneOptions, getMongoRepository, ObjectID, ObjectLiteral } from 'typeorm';
import { DuplicateError, NotFoundError } from 'src/commons/data.exception';
import { BaseEntity } from './base.entity';
import { sort } from '../utils/mongo/aggregate-tools';


export default class BaseService<E extends BaseEntity<E>> {
  protected readonly Entity: any;
  protected readonly Name: string;

  constructor(entity: any, name: string) {
    this.Entity = entity;
    this.Name = name;
  }

  sortByField(orderBy: string) {
    return function(a: E, b: E): number {
      const [field, orderType] = orderBy.split(' ');
      const compare = a[field] > b[field];
      const actual = orderType == 'ASC' ? compare : !compare;
      return actual ? 1 : -1;
    };
  }

  async find(query?: FindManyOptions<E> | Partial<E>, orderBy: string = 'createdAt DESC'): Promise<E[]> {
    const result = await getMongoRepository<E>(this.Entity).find(query);
    return result.sort(this.sortByField(orderBy));
  }

  findOne(query?: string | number | Date | ObjectID | FindOneOptions<E> | Partial<E>): Promise<E> {
    return getMongoRepository<E>(this.Entity).findOne(query);
  }

  save(plain: Partial<E>): Promise<E> {
    return getMongoRepository<E>(this.Entity).save(new this.Entity(plain));
  }

  async delete(ids: string[]): Promise<boolean> {
    const deleted = await getMongoRepository(this.Entity).deleteMany({
      _id: { $in: ids }
    });
    return !!deleted.result.ok;
  }

  async checkDuplication(query: string | number | Date | ObjectID | FindOneOptions<E> | Partial<E>, subject?: string): Promise<void> {
    const existed = await this.findOne(query);
    if (existed) throw new DuplicateError(subject || this.Name);
  }

  async checkExisted(query: string | number | Date | ObjectID | FindOneOptions<E> | Partial<E>, subject?: string): Promise<E> {
    const existed = await this.findOne(query);
    if (!existed) throw new NotFoundError(subject || this.Name);
    return existed;
  }

  async checkExistedId(id: string): Promise<E> {
    // @ts-ignore
    const existed = await this.findOne({ _id: id });
    if (!existed) throw new NotFoundError(this.Name);
    return existed;
  }


  async checkExistedIds(ids: string[]): Promise<E[]> {
    let rows: E[] = [];
    for (let id of ids) {
      // @ts-ignore
      const existed = await this.findOne({ _id: id });
      if (!existed) throw new NotFoundError(this.Name);
      rows.push(existed);
    }
    return rows;
  }

  aggregate(pipe: ObjectLiteral[]): Promise<any[]> {
    return getMongoRepository<E>(this.Entity).aggregate([sort('createdAt', -1), ...pipe]).toArray();
  }
}
