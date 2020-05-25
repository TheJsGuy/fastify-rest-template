import { reflections } from '../constants/reflect-keys';

export function Injectable({
  context = 'default',
  name
}) {
  return Reflect.metadata(reflections.app_injectable, [name, context]);
}


export function Inject(name, context = 'default') {
  return Reflect.metadata(reflections.app_inject, [name, context]);
}
