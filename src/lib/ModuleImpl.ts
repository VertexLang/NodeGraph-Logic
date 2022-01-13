import { Err, None, Ok, Option, Result, Some } from 'ts-results'
import { NodeType } from '..'
import { Context } from './api/Context'
import { DataType } from './api/DataType'
import { IdentifierError } from './api/Errors'
import { Module } from './api/Module'
import { DataTypeImpl } from './DataTypeImpl'
import { NodeTypeImpl } from './NodeTypeImpl'

/**
 * An implementation of the module interface.
 *
 * @memberof Module
 * @package
 */
export class ModuleImpl implements Module {
  private readonly _context: Context
  private readonly _dataTypes: DataType[] = []
  private readonly _nodeTypes: NodeType[] = []
  private _name = ''

  /**
   * Creates an instance of ModuleImpl.
   *
   * @param context - The context this module was created in.
   * @param name - The name of this module.
   * @returns The new module, or an {@link IdentifierError} if there is
   *          already a module in the provided context with the given name.
   */
  static new (context: Context, name: string): Result<ModuleImpl, IdentifierError> {
    const module = new ModuleImpl(context)

    const result = module.rename(name)
    if (result.err) {
      return Err(result.val)
    }

    return Ok(module)
  }

  /**
   * Creates a new instance of ModuleImpl.
   *
   * @param context - The context this module is defined in.
   */
  private constructor (context: Context) {
    this._context = context
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
  context (): Context {
    return this._context
  }

  /**
   * {@inheritdoc}
   */
  findDataType (name: string): Option<DataType> {
    for (const dataType of this._dataTypes) {
      if (dataType.name() === name) {
        return Some(dataType)
      }
    }

    return None
  }

  /**
   * {@inheritdoc}
   */
  createDataType (name: string): Result<DataType, IdentifierError> {
    const dataTypeResult = DataTypeImpl.new(this, name)
    if (dataTypeResult.err) {
      return Err(dataTypeResult.val)
    }

    const dataType = dataTypeResult.unwrap()
    this._dataTypes.push(dataType)
    return Ok(dataType)
  }

  /**
   * {@inheritdoc}
   */
  rename (name: string): Result<void, IdentifierError> {
    if (name === this._name) return Ok.EMPTY

    if (this._context.findModule(name).some) {
      return Err(new IdentifierError(`There is already a module with the name '${name}'!`))
    }

    this._name = name
    return Ok.EMPTY
  }

  /**
   * {@inheritdoc}
   */
  dataTypes (): readonly DataType[] {
    return this._dataTypes
  }

  /**
   * {@inheritdoc}
   */
  findNodeType (name: string): Option<NodeType> {
    for (const nodeType of this._nodeTypes) {
      if (nodeType.name() === name) {
        return Some(nodeType)
      }
    }

    return None
  }

  /**
   * {@inheritdoc}
   */
  createNodeType (name: string, inputs: DataType[], outputs: DataType[]): Result<NodeType, IdentifierError> {
    const nodeTypeResult = NodeTypeImpl.new(this, name, inputs, outputs)
    if (nodeTypeResult.err) {
      return Err(nodeTypeResult.val)
    }

    const nodeType = nodeTypeResult.unwrap()
    this._nodeTypes.push(nodeType)
    return Ok(nodeType)
  }

  /**
   * {@inheritdoc}
   */
  nodeTypes (): readonly NodeType[] {
    return this._nodeTypes
  }
}
