import { ContextImpl } from '../lib/ContextImpl'

describe('plug relationships', () => {
  it('should allow show print 2 input plugs and 1 output plug', () => {
    const context = new ContextImpl()
    const module = context.createModule('math').unwrap()
    const number = module.createDataType('Number').unwrap()
    const type = module.createNodeType('Add', [number, number], [number]).unwrap()

    const graph = context.createGraph('g').unwrap()
    const node = graph.addNode('add', type, 0, 0).unwrap()

    expect(node.inputs()).toHaveLength(2)
    expect(node.outputs()).toHaveLength(1)

    expect(node.inputs()[0].isInput()).toBe(true)
    expect(node.inputs()[1].isInput()).toBe(true)
    expect(node.outputs()[0].isInput()).toBe(false)

    expect(node.inputs()[0].dataType()).toBe(number)
    expect(node.inputs()[1].dataType()).toBe(number)
    expect(node.outputs()[0].dataType()).toBe(number)
  })
})
