import { Option, Result } from 'ts-results'
import { Context } from './Context'
import { DataType } from './DataType'
import { IdentifierError } from './Errors'
import { NodeType } from './NodeType'

/**
 * A container for a set of datatypes and node types that are defined together.
 *
 * @public
 */
export interface Module {
  /**
   * Gets the name of this module.
   *
   * @remarks
   *
   * This should be a unquie identifier. No two modules with the same name can
   * be loaded into a context at the same time.
   *
   * If a module is nested inside of another module, it's name is formatted as
   * `module_a.module_b`.
   *
   * @returns The name.
   *
   * @see {@link Context}, {@link rename}
   */
  name: () => string

  /**
   * Gets the context that this module is defined in.
   *
   * @returns The context.
   */
  context: () => Context

  /**
   * Tries to find the data type in this module with the given name.
   *
   * @param name - The name of the data type. (Case sensitive)
   * @returns The data type with the given name, or None if it could not be
   *          found.
   *
   * @see {@link DataType}
   */
  findDataType: (name: string) => Option<DataType>

  /**
   * Creates a new data type in this module with the given name.
   *
   * @returns The newly created data type, or an {@link IdentifierError} if
   *          there is already a data type with the given name in this module.
   */
  createDataType: (name: string) => Result<DataType, IdentifierError>

  /**
   * Gets a readonly array of all data types that are currently in this module.
   *
   * @returns A readonly array of data types.
   */
  dataTypes: () => readonly DataType[]

  /**
   * Renames this module to another name.
   *
   * @returns An {@link IdentifierError} if there is already a module in the
   *          context this module is in with the given name.
   *
   * @see {@link name}
   */
  rename: (name: string) => Result<void, IdentifierError>

  /**
   * Tries to find the node in this module with the given name.
   *
   * @param name - The name of the node type. (Case sensitive)
   * @returns The node type with the given name, or None if it could not be
   *          found.
   *
   * @see {@link NodeType}
   */
  findNodeType: (name: string) => Option<NodeType>

  /**
   * Creates a new node type in this module with the given name.
   *
   * @param name - The name of the node type.
   * @param inputs - An array of data types to represent the input plugs.
   * @param outputs - An array of data types to represent the output plugs.
   *
   * @returns The newly created node type, or an {@link IdentifierError} if
   *          there is already a node type with the given name in this module.
   */
  createNodeType: (name: string, inputs: DataType[], outputs: DataType[]) => Result<NodeType, IdentifierError>

  /**
   * Gets a readonly array of all node types that are currently in this module.
   *
   * @returns A readonly array of node types.
   */
  nodeTypes: () => readonly NodeType[]
}
