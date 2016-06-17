import { Meteor } from 'meteor/meteor';
import Encounter from '../models/Encounter';

Meteor.startup(() => {
  
  Meteor.publish(Encounter.collectionName, function encounterPublication() {
    return Encounter.collection.find({owner: this.userId});
  });
  
});
