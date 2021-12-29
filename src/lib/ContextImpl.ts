import { Result, Option, Ok, Err, Some, None } from 'ts-results'
import { Graph } from './api/Graph'
import { Context } from './api/Context'
import { IdentifierError } from './api/Errors'
import { Module } from './api/Module'
import { ModuleImpl } from './ModuleImpl'
import { GraphImpl } from './GraphImpl'

/**
 * An implementation of the Context interface.
 *
 * @memberof Context
 * @package
 */
export class ContextImpl implements Context {
  private readonly _modules: Module[] = []
  private readonly _graphs: Graph[] = []

  /**
   * {@inheritdoc}
   */
  createModule (name: string): Result<Module, IdentifierError> {
    const moduleResult = ModuleImpl.new(this, name)
    if (moduleResult.err) {
      return Err(moduleResult.val)
    }

    const module = moduleResult.unwrap()
    this._modules.push(module)
    return Ok(module)
  }

  /**
   * {@inheritdoc}
   */
  createGraph (name: string): Result<Graph, IdentifierError> {
    const graphResult = GraphImpl.new(this, name)
    if (graphResult.err) {
      return Err(graphResult.val)
    }

    const graph = graphResult.unwrap()
    this._graphs.push(graph)
    return Ok(graph)
  }

  /**
   * {@inheritdoc}
   */
  findModule (name: string): Option<Module> {
    for (const module of this._modules) {
      if (module.name() === name) {
        return Some(module)
      }
    }

    return None
  }

  /**
   * {@inheritdoc}
   */
  findGraph (name: string): Option<Graph> {
    for (const graph of this._graphs) {
      if (graph.name() === name) {
        return Some(graph)
      }
    }

    return None
  }

  /**
   * {@inheritdoc}
   */
  modules (): readonly Module[] {
    return this._modules
  }

  /**
   * {@inheritdoc}
   */
  graphs (): readonly Graph[] {
    return this._graphs
  }
}
