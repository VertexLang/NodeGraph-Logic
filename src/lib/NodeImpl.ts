import { Err, Ok, Result } from 'ts-results'
import { Node } from './api/Node'
import { IdentifierError, InvalidArgumentError } from './api/Errors'
import { Graph } from './api/Graph'
import { NodeType } from './api/NodeType'
import { Plug } from './api/Plug'
import { PlugImpl } from './PlugImpl'

/**
 * An implementation of the Node interface.
 *
 * @package
 * @memberof NodeImpl
 */
export class NodeImpl implements Node {
  private readonly _graph: Graph
  private readonly _nodeType: NodeType
  private readonly _inputs: Plug[] = []
  private readonly _outputs: Plug[] = []
  private _name = ''
  private _x = 0
  private _y = 0
  private _width = 0
  private _height = 0

  /**
   * Creates an instance of NodeImpl.
   *
   * @param graph - The graph that the node is being created in.
   * @param name - The name of this node.
   * @param nodeType - The type of node to create.
   * @returns The new node, or an IdentifierError if there is already a node in
   *          the provided graph with the given name.
   */
  static new (graph: Graph, name: string, nodeType: NodeType): Result<NodeImpl, IdentifierError> {
    const node = new NodeImpl(graph, nodeType)

    const result = node.rename(name)
    if (result.err) {
      return Err(result.val)
    }

    for (const input of nodeType.inputs()) {
      const plug = PlugImpl.new(input, node, true)
      if (plug.err) {
        return Err(plug.val)
      }

      node._inputs.push(plug.val)
    }

    for (const output of nodeType.outputs()) {
      const plug = PlugImpl.new(output, node, false)
      if (plug.err) {
        return Err(plug.val)
      }

      node._outputs.push(plug.val)
    }

    return Ok(node)
  }

  /**
   * Creates an instance of NodeImpl.
   *
   * @param graph - The graph that this node is being created in.
   * @param nodeType - The node type that this node extends from.
   */
  private constructor (graph: Graph, nodeType: NodeType) {
    this._graph = graph
    this._nodeType = nodeType
  }

  /**
   * {@inheritdoc}
   */
  x (): number {
    return this._x
  }

  /**
   * {@inheritdoc}
   */
  y (): number {
    return this._y
  }

  /**
   * {@inheritdoc}
   */
  width (): number {
    return this._width
  }

  /**
   * {@inheritdoc}
   */
  height (): number {
    return this._height
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
  nodeType (): NodeType {
    return this._nodeType
  }

  /**
   * {@inheritdoc}
   */
  graph (): Graph {
    return this._graph
  }

  /**
   * {@inheritdoc}
   */
  rename (name: string): Result<void, IdentifierError> {
    if (this._graph.findNode(name).some) {
      return Err(new IdentifierError(`There is already a node with the name '${name}'!`))
    }

    this._name = name
    return Ok.EMPTY
  }

  /**
   * {@inheritdoc}
   */
  moveTo (x: number, y: number): void {
    this._x = x
    this._y = y
  }

  /**
   * {@inheritdoc}
   */
  setSize (width: number, height: number): Result<void, InvalidArgumentError> {
    if (width < 1 || height < 1) {
      return Err(new InvalidArgumentError('Width and height cannot be less than 1 unit!'))
    }

    this._width = width
    this._height = height
    return Ok.EMPTY
  }

  /**
   * {@inheritdoc}
   */
  inputs (): readonly Plug[] {
    return this._inputs
  }

  /**
   * {@inheritdoc}
   */
  outputs (): readonly Plug[] {
    return this._outputs
  }
}
