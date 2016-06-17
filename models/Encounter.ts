import { Model, ModelDao } from '../lib/lightspeed/Model';

interface EncounterDao extends ModelDao {
  name: String;
  isRunning?: Boolean;
}

/**
 * Encounter
 *
 * Represents a Dungeons and Dragons encounter.
 */
export default class Encounter extends Model {
  public name: String;
  public isRunning: Boolean;

  public constructor(dao: EncounterDao) {
    super(dao);
    this.name = dao.name;
    this.isRunning = dao.isRunning || false;
  }

  public start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
    }
  }

  public end(): void {
    if (this.isRunning) {
      this.isRunning = false;
    }
  }
}

Model.registerModel(Encounter);
