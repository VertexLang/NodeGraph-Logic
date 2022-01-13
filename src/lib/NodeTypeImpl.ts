import { Err, Ok, Result } from 'ts-results'
import { NodeType } from '..'
import { DataType } from './api/DataType'
import { IdentifierError } from './api/Errors'
import { Module } from './api/Module'

/**
 * An implementation of the node type interface.
 *
 * @memberof NodeType
 * @package
 */
export class NodeTypeImpl implements NodeType {
  private readonly _inputs: DataType[] = []
  private readonly _outputs: DataType[] = []
  private readonly _inputNames: string[] = []
  private readonly _outputNames: string[] = []
  private readonly _module
  private _name = ''

  /**
   * Creates an instance of NodeTypeImpl.
   *
   * @param module - The module this node type was created in.
   * @param name - The name of this node type.
   * @returns The new node type, or an {@link IdentifierError} if there is
   *          already a node type in the provided module with the given name.
   */
  static new (module: Module, name: string, inputs: DataType[], outputs: DataType[]): Result<NodeTypeImpl, IdentifierError> {
    const nodeType = new NodeTypeImpl(module)

    const result = nodeType.rename(name)
    if (result.err) {
      return Err(result.val)
    }

    for (const input of inputs) {
      nodeType._inputs.push(input)
    }

    for (const output of outputs) {
      nodeType._outputs.push(output)
    }

    return Ok(nodeType)
  }

  /**
   * Creates a new instance of NodeTypeImpl.
   *
   * @param module - The module this node type is defined in.
   */
  private constructor (module: Module) {
    this._module = module
  }

  /**
   * {@inheritdoc}
   */
  name (): string {
    return this._name
  }

  /**
   * {@inheritdoc}
   */
  module (): Module {
    return this._module
  }

  /**
   * {@inheritdoc}
   */
  rename (name: string): Result<void, IdentifierError> {
    if (name === this._name) return Ok.EMPTY

    if (this._module.findNodeType(name).some) {
      return Err(new IdentifierError(`There is already a node type with the name '${name}'!`))
    }

    this._name = name
    return Ok.EMPTY
  }

  /**
   * {@inheritdoc}
   */
  inputs (): readonly DataType[] {
    return this._inputs
  }

  /**
   * {@inheritdoc}
   */
  inputNames (): readonly string[] {
    return this._inputNames
  }

  /**
   * {@inheritdoc}
   */
  outputs (): readonly DataType[] {
    return this._outputs
  }

  /**
   * {@inheritdoc}
   */
  outputNames (): readonly string[] {
    return this._outputNames
  }
}
