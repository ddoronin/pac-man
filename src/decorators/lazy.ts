export function lazy<T>(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
) {
  const get = descriptor.get;
  descriptor.get = function getLazy() {
    const that = this;
    if (!that[`__${propertyKey}`] && get) {
      that[`__${propertyKey}`] = get.apply(that);
    }
    return that[`__${propertyKey}`] as T;
  };
}
