import { Plug } from './Plug'

/**
 * A connection shows a relationship between the outputs and inputs of two
 * seperate nodes.
 *
 * @public
 */
export interface Connection {
  /**
   * Gets the output plug that this connection is coming out of.
   *
   * @remarks
   *
   * The output plug is also sometimes refered to as the parent plug, or parent
   * node where applicable.
   *
   * @returns The output plug.
   * @see {@link Plug}
   */
  outputPlug: () => Plug

  /**
   * Gets the input plug that this connection is going in to.
   *
   * @remarks
   *
   * The input plug is also sometimes refered to as the child plug, or child
   * node where applicable.
   *
   * @returns The input plug.
   * @see {@link Plug}
   */
  inputPlug: () => Plug
}
