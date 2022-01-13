import { Ok, Result } from 'ts-results'
import { IdentifierError } from './api/Errors'
import { DataType } from './api/DataType'
import { Plug } from './api/Plug'
import { Node } from './api/Node'

export class PlugImpl implements Plug {
  private readonly _dataType: DataType
  private readonly _node: Node
  private readonly _isInput: boolean

  static new (dataType: DataType, node: Node, isInput: boolean): Result<PlugImpl, IdentifierError> {
    const plug = new PlugImpl(dataType, node, isInput)
    return Ok(plug)
  }

  private constructor (dataType: DataType, node: Node, isInput: boolean) {
    this._dataType = dataType
    this._node = node
    this._isInput = isInput
  }

  dataType (): DataType {
    return this._dataType
  }

  node (): Node {
    return this._node
  }

  isInput (): boolean {
    return this._isInput
  }
}
