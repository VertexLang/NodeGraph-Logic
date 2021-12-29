[nodegraph-logic](../README.md) / [Exports](../modules.md) / Graph

# Interface: Graph

A container for a set of function nodes to show relationships.

**`remarks`**

A Graph, or NodeGraph, is a type of diagram that shows the relationship
of multiple function instances to display how information should be
transformed as it is passed through the graph. Each graph can be thought of
as a function in itself that takes in a set of input data types, or constant
data types, and transforms them in order to produce an output data type. The
inputs, constants, and outputs are usually also represented as nodes within
this graph.

A graph may not contain circular depdencies between nodes.

## Table of contents

### Methods

- [addNode](Graph.md#addnode)
- [context](Graph.md#context)
- [findNode](Graph.md#findnode)
- [name](Graph.md#name)
- [rename](Graph.md#rename)

## Methods

### addNode

▸ **addNode**(`name`, `x`, `y`): `Result`<[`Node`](Node.md), [`IdentifierError`](../classes/IdentifierError.md)\>

Creates a new node within this graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of this node. |
| `x` | `number` | The x position of this node in world units. |
| `y` | `number` | The y position of this node in world units. |

#### Returns

`Result`<[`Node`](Node.md), [`IdentifierError`](../classes/IdentifierError.md)\>

The newly created node, or an [IdentifierError](../classes/IdentifierError.md) if there is
         already a node with the given name.

#### Defined in

src/lib/api/Graph.ts:64

___

### context

▸ **context**(): [`Context`](Context.md)

Gets the context that this graph is defined in.

#### Returns

[`Context`](Context.md)

The graph.

#### Defined in

src/lib/api/Graph.ts:42

___

### findNode

▸ **findNode**(`name`): `Option`<[`Node`](Node.md)\>

Finds a node in this graph with the given name.

**`remarks`**

This function is case sensitive.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the node to find. |

#### Returns

`Option`<[`Node`](Node.md)\>

The node with the given name, or null if there is no node with
         that name.

#### Defined in

src/lib/api/Graph.ts:77

___

### name

▸ **name**(): `string`

Gets the name of this graph.

**`remarks`**

This should be a unquie identifier within a context.

**`see`** [Context](Context.md), [rename](Graph.md#rename)

#### Returns

`string`

The name.

#### Defined in

src/lib/api/Graph.ts:35

___

### rename

▸ **rename**(`name`): `Result`<`void`, [`IdentifierError`](../classes/IdentifierError.md)\>

Sets a new name for this graph.

**`see`** [name](Graph.md#name)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Result`<`void`, [`IdentifierError`](../classes/IdentifierError.md)\>

An [IdentifierError](../classes/IdentifierError.md) if there is already a graph in the
         context this graph is in with the given name.

#### Defined in

src/lib/api/Graph.ts:52
