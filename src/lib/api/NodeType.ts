import { Result } from 'ts-results'
import { DataType } from './DataType'
import { IdentifierError } from './Errors'
import { Module } from './Module'

// TODO Make NodeTypes part of Context

/**
 * Defines a template for a node instance.
 *
 * @remarks
 *
 * All nodes have a node type that they pull information from. This can be seen
 * as a function pointer that the node is instantiating.
 *
 * @public
 */
export interface NodeType {
  /**
   * Gets the name of this node type.
   *
   * @remarks
   *
   * This should be a unquie identifier. No two node types with the same name
   * can exist in a module at the same time.
   *
   * @returns The name.
   *
   * @see {@link Module}, {@link rename}
   */
  name: () => string

  /**
   * Gets the module that this node type is defined in.
   *
   * @returns The module.
   */
  module: () => Module

  /**
   * Renames this node type to another name.
   *
   * @returns An {@link IdentifierError} if there is already a node type in the
   *          module this node type is in with the given name.
   *
   * @see {@link name}
   */
  rename: (name: string) => Result<void, IdentifierError>

  /**
   * Gets a readonly list of all data types this node type takes as input.
   *
   * @remarks
   *
   * The list of data types is in order and matches the input plugs that a
   * node instantiating this node type should implement.
   *
   * @returns A readonly list of data types.
   * @see {@link DataType}
   */
  inputs: () => readonly DataType[]

  /**
   * Gets a readonly list of input names for each input in this node type.
   *
   * @remarks
   *
   * This list is a 1 to 1 correspondance with the input data types list.
   *
   * @returns A readonly list of input names.
   * @see {@link inputs}
   */
  inputNames: () => readonly string[]

  /**
   * Gets a readonly list of all data types this node type provides as output.
   *
   * @remarks
   *
   * The list of data types is in order and matches the output plugs that a
   * node instantiating this node type should implement.
   *
   * @returns A readonly list of data types.
   * @see {@link DataType}
   */
  outputs: () => readonly DataType[]

  /**
   * Gets a readonly list of output names for each input in this node type.
   *
   * @remarks
   *
   * This list is a 1 to 1 correspondance with the output data types list.
   *
   * @returns A readonly list of output names.
   * @see {@link inputs}
   */
  outputNames: () => readonly string[]
}
