import { Moment } from '../moment';

export function joinMany2One(target: string, localField: string, foreignField: string, as: string, displayField: string) {
  const setOptions = {};
  setOptions[as] = '$' + as + '.' + displayField;
  return [
    join(target, localField, foreignField, as),
    unwind('$' + as),
    set(setOptions)
  ];
}

export function join(target: string, localField: string, foreignField: string, as: string): object {
  return {
    $lookup: {
      'from': target,
      localField,
      foreignField,
      as
    }
  };
}

export function sort(field: string, sortType: 1 | -1) {
  const options = {};
  options[field] = sortType;
  return { $sort: options };
}

export function unwind(path: string, preserveNullAndEmptyArrays: boolean = true): object {
  return { $unwind: { path, preserveNullAndEmptyArrays } };
}

export function match(query: object): object {
  return { $match: query };
}

export function set(options: object): object {
  return { $set: options };
}

export function condIf(condition: object, truthy: any, falsy: any) {
  return {
    $cond: {
      if: condition,
      then: truthy,
      else: falsy
    }
  };
}

export function or(...expression: any[]){
  return {$or: [...expression]}
}

export function and(...expression: any[]){
  return {$and: [...expression]}
}

export function gte(left: any, right: any){
  return {$gte: [left, right]}
}

export function fieldExists(field: string){
  return { $ifNull: [ '$'+field, false ] }
}