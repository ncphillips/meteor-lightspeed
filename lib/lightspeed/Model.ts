import { Mongo } from 'meteor/mongo';

export interface ModelDao {
  _id?: Mongo.ObjectID;
  owner: Mongo.ObjectID;
  username: String;
  createdAt: Date;
}

export class Model {
  public static collectionName: String;
  public static collection: Mongo.Collection;
  public __proto__: any;
  public _id: Mongo.ObjectID;
  public owner: Mongo.ObjectID;
  public username: String;
  public createdAt: Date;

  public constructor(dao: ModelDao) {
    if (dao._id)
      this._id = dao._id || null;
    this.owner = dao.owner;
    this.username = dao.username;
    this.createdAt = dao.createdAt;
  }

  /**
   * Persistence
   */
  public save(): void {
    this.callMethod("save")
  }

  public remove(): void {
    this.callMethod("remove")
  }

  /**
   * Meta
   */
  private getModelName(): String {
    return this.__proto__.constructor.name;
  }

  public getCollection(): Mongo.Collection {
    return this.__proto__.constructor.collection;
  }

  /**
   * Meteor Helpers
   */
  protected callMethod(methodName: String) {
    var name = [this.getModelName(), methodName].join('.');
    Meteor.call(name, this);
  }

  public static registerModel(constructor: any, defaultCrudMethods?: Boolean): void {
    constructor.collectionName = constructor.collectionName || constructor.name.toLowerCase();

    constructor.collection = new Mongo.Collection(constructor.collectionName);

    if (defaultCrudMethods) {
      Model.registerCrudMethods(constructor);
    }
  }

  private static registerCrudMethods(constructor: any): void {
    let collection: Mongo.Collection = constructor.collection;

    Model.registerMethods(constructor, [
      function save(model) {
        defaultSave.call(this, collection, model);
      },
      function remove(model) {
        defaultRemove.call(this, collection, model);
      }
    ]);
  }

  public static registerMethods(constructor: any, methodArray: Function | Function[]): void {
    let modelName = constructor.name;
    let methods = {};

    methodArray = Array.isArray(methodArray) ? methodArray : [methodArray];

    methodArray.forEach((method) => {
      methods[modelName + "." + method.name] = method;
    });

    Meteor.methods(methods);
  }
}

function defaultSave(collection: Mongo.Collection, model: Model) {
  console.log(this);
  if (!this.userId) {
    throw new Meteor.Error("not-authorized");
  }

  if (model._id) {
    collection.update(model._id, model);
  } else {
    model.createdAt = new Date();
    model.owner = Meteor.userId();
    model.username = Meteor.user().username;
    model.createdAt = new Date();
    collection.insert(model);
  }
}

function defaultRemove(collection: Mongo.Collection, model) {
  if (this.userId !== model.owner) {
    throw new Meteor.Error("not-authorized");
  }

  collection.remove(model._id);
}