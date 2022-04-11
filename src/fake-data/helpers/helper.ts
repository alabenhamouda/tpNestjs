import { Repository } from 'typeorm';

export default abstract class Helper {
  constructor(private readonly repository: Repository<any>) {}
  abstract create(...args);
  createMany(count: number, ...args) {
    const entities = [];
    for (let i = 0; i < count; i++) {
      entities.push(this.create(...args));
    }
    return entities;
  }
  save(entity: any) {
    return this.repository.save(entity);
  }
  deleteAll() {
    return this.repository.query(
      `DELETE FROM ${this.repository.metadata.tableName}`,
    );
  }
}
