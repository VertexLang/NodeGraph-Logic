import { ContextImpl } from '../lib/ContextImpl'

describe('addNode', () => {
  it('should add a new node', () => {
    const context = new ContextImpl()
    const module = context.createModule('math').unwrap()
    const number = module.createDataType('number').unwrap()
    const type = module.createNodeType('add', [number, number], [number]).unwrap()

    const graph = context.createGraph('g').unwrap()
    const node = graph.addNode('add', type, 10, 10).unwrap()

    expect(graph.findNode('add').unwrap()).toBe(node)
  })

  it('should fail to add a node of the same name', () => {
    const context = new ContextImpl()
    const module = context.createModule('math').unwrap()
    const number = module.createDataType('number').unwrap()
    const type = module.createNodeType('add', [number, number], [number]).unwrap()

    const graph = context.createGraph('g').unwrap()
    graph.addNode('func', type, 10, 10).unwrap()

    const secondNode = graph.addNode('func', type, 0, 0)
    expect(secondNode.unwrap).toThrow()
  })
})
