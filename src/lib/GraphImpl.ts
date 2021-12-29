import { NodeImpl } from './NodeImpl'
import { Node } from './api/Node'
import { Graph } from './api/Graph'
import { IdentifierError } from './api/Errors'
import { Err, None, Ok, Option, Result, Some } from 'ts-results'
import { Context } from './api/Context'

/**
 * An implementation of the Graph interface.
 *
 * @memberof Graph
 * @package
 */
export class GraphImpl implements Graph {
  private readonly _context: Context
  private readonly nodes: Node[] = []
  private _name = ''

  /**
   * Creates an instance of GraphImpl.
   *
   * @param context - The context this graph was created in.
   * @param name - The name of this graph.
   * @returns The new graph, or an {@link IdentifierError} if there is
   *          already a graph in the provided context with the given name.
   */
  static new (context: Context, name: string): Result<GraphImpl, IdentifierError> {
    const graph = new GraphImpl(context)

    const result = graph.rename(name)
    if (result.err) {
      return Err(result.val)
    }

    return Ok(graph)
  }

  /**
   * Creates an instance of DataTypeImpl.
   *
   * @param module - The module this data type was created in.
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
  rename (name: string): Result<void, IdentifierError> {
    if (this._name === name) return Ok.EMPTY

    if (this._context.findGraph(name).some) {
      return Err(new IdentifierError(`There is already a graph with the name '${name}'!`))
    }

    this._name = name
    return Ok.EMPTY
  }

  /**
   * {@inheritdoc}
   */
  addNode (name: string, x: number, y: number): Result<Node, IdentifierError> {
    const nodeResult = NodeImpl.new(this, name)
    if (nodeResult.err) {
      return Err(nodeResult.val)
    }

    const node = nodeResult.unwrap()
    node.moveTo(x, y)

    this.nodes.push(node)
    return Ok(node)
  }

  /**
   * {@inheritdoc}
   */
  findNode (name: string): Option<Node> {
    for (const node of this.nodes) {
      if (node.name() === name) return Some(node)
    }

    return None
  }
}
