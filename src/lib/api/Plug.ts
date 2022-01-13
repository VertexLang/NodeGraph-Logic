import { DataType } from './DataType'
import { Node } from './Node'

// TODO Plugs should each have their own identifier name within a Node instance.

/**
 * A plug is part of a node that shows what type of information it requires.
 *
 * @public
 */
export interface Plug {
  /**
   * Gets the data type that this plug contains.
   *
   * @returns The data type this plug represents.
   * @see {@link DataType}
   */
  dataType: () => DataType

  /**
   * Gets the node that this plug is attached to.
   *
   * @returns The node.
   * @see {@link Node}
   */
  node: () => Node

  /**
   * Gets whether or not this plug is an input plug or an output plug.
   *
   * @returns True if this plug is an input plug. False otherwise.
   */
  isInput: () => boolean
}
