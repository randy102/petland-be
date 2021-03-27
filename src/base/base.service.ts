import { FindManyOptions, FindOneOptions, getMongoRepository, ObjectID, ObjectLiteral } from 'typeorm';
import { DuplicateError, NotFoundError } from 'src/commons/data.exception';
import { BaseEntity } from './base.entity';


export default class BaseService<E extends BaseEntity<E>> {
  protected readonly Entity: any;
  protected readonly Name: string;

  constructor(entity: any, name: string) {
    this.Entity = entity;
    this.Name = name;
  }

  find(query?: FindManyOptions<E> | Partial<E>): Promise<E[]> {
    return getMongoRepository<E>(this.Entity).find(query);
  }

  findOne(query?: string | number | Date | ObjectID | FindOneOptions<E> | Partial<E>): Promise<E> {
    return getMongoRepository<E>(this.Entity).findOne(query);
  }

  save(plain: Partial<E>): Promise<E> {
    return getMongoRepository<E>(this.Entity).save(new this.Entity(plain));
  }

  async delete(ids: string[]): Promise<boolean> {
    const deleted = await getMongoRepository(this.Entity).deleteMany({
      _id: { $in: ids },
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


  async checkExistedIds(ids: string[]): Promise<E[]> {
    let rows: E[] = [];
    for (let id of ids) {
      const existed = await this.findOne(id);
      if (!existed) throw new NotFoundError(this.Name);
      rows.push(existed);
    }
    return rows;
  }

  aggregate(pipe: ObjectLiteral[]): Promise<any[]> {
    return getMongoRepository<E>(this.Entity).aggregate(pipe).toArray();
  }
}
