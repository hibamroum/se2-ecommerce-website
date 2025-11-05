export type id = string; //string represents an identifier specifically, not just any string. which improves code readability, and future maintainability; If you later decide IDs should be numbers, UUIDs with validation, or branded types, you only need to change the definition in one place
export interface ID {
  //creates a standard shape for any entity that has an ID field. This is useful for:
  getId(): id;
}

/**
 * Generic repository contract for basic CRUD operations on entities of type T.
 *
 * @template T - The type of items managed by the repository.
 */
export interface IRepository<T> {
  /**
   * Creates a new item.
   *
   * @param item The item to be created
   * @returns A promise that resolves to the ID of the created object.The returned ID object is expected to implement a getId() accessor.
   * @throws {InvalidItemExcetion} when the provided item is invalid.
   */
  create(item: T): Promise<id>;

  /**
   * Retrieve an item from the repository by its ID.
   *
   * @param id the ID of the item to be retrieved from the repository
   * @returns A Promise that resolves to the item with the specified ID
   * @throws {ItemNotFoundException} when an item with the specified ID is not found
   */
  readOne(id: id): Promise<T>;

  /**
   * Retrieve all stored items from the repository.
   *
   * @returns A Promise that resolves to an array of all items in the repository
   */
  readAll(): Promise<T[]>;

  /**
   *Update an existing item in the repository
   *
   * @param id he ID of the item to be updated
   * @param item The item to be updated
   * @returns A promise that resolves to the updated item when the item is successfully updated
   * @throws {ItemNotFoundException} when the item to be updated is not found
   * @throws {InvalidItemExcetion} when the provided item is invalid.
   */
  update(id: id, item: T): Promise<T>; //takes updated data for the item and returns the item

  /**
   * Delete an item from the repository by its ID
   *
   * @param id Remove the item identified by id.
   * @returns A promise that resolves when the item is successfully deleted
   * @throws {ItemNotFoundException} when no item exists for the provided id.
   */
  delete(id: id): Promise<void>;
}
