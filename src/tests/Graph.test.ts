import { ContextImpl } from '../lib/ContextImpl'

describe('addNode', () => {
  it('should add a new node', () => {
    const graph = new ContextImpl().createGraph('g').unwrap()
    const node = graph.addNode('add', 10, 10).unwrap()

    expect(graph.findNode('add').unwrap()).toBe(node)
  })

  it('should fail to add a node of the same name', () => {
    const graph = new ContextImpl().createGraph('g').unwrap()
    graph.addNode('func', 0, 0)

    const secondNode = graph.addNode('func', 0, 0)
    expect(secondNode.unwrap).toThrow()
  })
})
