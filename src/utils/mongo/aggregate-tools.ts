export function joinMany2One(target: string, localField: string, foreignField: string, as: string, displayField: string){
  const setOptions = {}
  setOptions[as] = '$'+as+'.'+displayField
  return [
    join(target, localField,foreignField, as),
    unwind('$'+as),
    set(setOptions)
  ]
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

export function unwind(path: string, preserveNullAndEmptyArrays: boolean = true): object{
  return { $unwind: { path, preserveNullAndEmptyArrays } }
}

export function match(query: object): object{
  return { $match: query }
}

export function set(options: object): object{
  return { $set: options }
}