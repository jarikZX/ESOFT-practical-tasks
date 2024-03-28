function deepCopy(obj, clonedObjects = new WeakMap()) {
  if (
    obj === null ||
    typeof obj !== "object" ||
    obj instanceof Date ||
    obj instanceof RegExp ||
    obj instanceof Map ||
    obj instanceof Set ||
    obj instanceof WeakMap ||
    obj instanceof WeakSet
  ) {
    return obj; 
  }

  if (clonedObjects.has(obj)) {
    return clonedObjects.get(obj);
  }

  let copy;
  if (Array.isArray(obj)) {
    copy = []; 
    clonedObjects.set(obj, copy); 
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepCopy(obj[i], clonedObjects); 
    }
  } else {
    if (obj.constructor) {
      copy = Object.create(Object.getPrototypeOf(obj)); 
    } else {
      copy = Object.create(null); 
    }
    clonedObjects.set(obj, copy); 
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "function" || typeof obj[key] === "symbol") {
          copy[key] = obj[key]; 
        } else {
          copy[key] = deepCopy(obj[key], clonedObjects);
        }
      }
    }
  }

  return copy;
}


// Создаем прототип объекта
const objPrototype = {
  greet() {
    console.log("Hello from prototype!");
  }
};

// Создаем объект с прототипом
const objWithPrototype = Object.create(objPrototype);
objWithPrototype.name = "Alice";

// Создаем объект с циклической ссылкой
const objWithCircularRef = { prop: null };
objWithCircularRef.prop = objWithCircularRef;

// Создаем объект с различными типами данных
const objWithDataTypes = {
  a: 1,
  b: "string",
  c: [1, 2, 3],
  d: { x: 1, y: 2 },
  e: new Date(),
  f: /[a-z]/,
  g: new Map([[1, 'one'], [2, 'two']]),
  h: new Set([1, 2, 3]),
  i: function() { console.log("Function"); },
  j: Symbol("test")
};

// Создаем пример с функциями и символами
function someFunction() {}
objWithDataTypes.funcProp = someFunction;
objWithDataTypes.symbolProp = Symbol("test");

// Копируем объекты
const copiedObjWithPrototype = deepCopy(objWithPrototype);
const copiedObjWithCircularRef = deepCopy(objWithCircularRef);
const copiedObjWithDataTypes = deepCopy(objWithDataTypes);

// Проверяем прототип
console.log(Object.getPrototypeOf(copiedObjWithPrototype) === objPrototype); 

// Проверяем циклическую ссылку
console.log(copiedObjWithCircularRef.prop === copiedObjWithCircularRef); 

// Выводим скопированный объект с различными типами данных
console.log(copiedObjWithDataTypes);

// Вызываем метод из прототипа
copiedObjWithPrototype.greet();

// Вызываем скопированные функции
copiedObjWithDataTypes.i();
console.log(copiedObjWithDataTypes.symbolProp);