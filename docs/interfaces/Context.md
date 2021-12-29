[nodegraph-logic](../README.md) / [Exports](../modules.md) / Context

# Interface: Context

A collection of currently loaded modules.

**`remarks`**

When working with a node graph, it may only be created within a context and
may only use data types or functions defined within modules that are loaded
in that same context. This helps to add a central authority for how loaded
information within a graph may communicate with itself without the outside
of seperate contexts. Each context may contain any number of loaded graphs,
modules, data types, and functions.

## Table of contents

### Methods

- [createGraph](Context.md#creategraph)
- [createModule](Context.md#createmodule)
- [findGraph](Context.md#findgraph)
- [findModule](Context.md#findmodule)
- [graphs](Context.md#graphs)
- [modules](Context.md#modules)

## Methods

### createGraph

▸ **createGraph**(`name`): `Result`<[`Graph`](Graph.md), [`IdentifierError`](../classes/IdentifierError.md)\>

Creates a new graph within this context.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Result`<[`Graph`](Graph.md), [`IdentifierError`](../classes/IdentifierError.md)\>

The newly created graph, or an [IdentifierError](../classes/IdentifierError.md) if there
         is already a graph with the given name.

#### Defined in

src/lib/api/Context.ts:35

___

### createModule

▸ **createModule**(`name`): `Result`<[`Module`](Module.md), [`IdentifierError`](../classes/IdentifierError.md)\>

Creates a new module within this context.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Result`<[`Module`](Module.md), [`IdentifierError`](../classes/IdentifierError.md)\>

The newly created module, or an [IdentifierError](../classes/IdentifierError.md) if there
         is already a module with the given name.

#### Defined in

src/lib/api/Context.ts:27

___

### findGraph

▸ **findGraph**(`name`): `Option`<[`Graph`](Graph.md)\>

Tries to find the graph with the given name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the graph to look for. (Case sensitive) |

#### Returns

`Option`<[`Graph`](Graph.md)\>

The graph with the given name, or None if the graph could not
         be found.

#### Defined in

src/lib/api/Context.ts:53

___

### findModule

▸ **findModule**(`name`): `Option`<[`Module`](Module.md)\>

Tries to find the module with the given name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the module to look for. (Case sensitive) |

#### Returns

`Option`<[`Module`](Module.md)\>

The module with the given name, or None if the module could not
         be found.

#### Defined in

src/lib/api/Context.ts:44

___

### graphs

▸ **graphs**(): readonly [`Graph`](Graph.md)[]

Gets a readonly array of all graphs that are currently in this context.

#### Returns

readonly [`Graph`](Graph.md)[]

A readonly array of graphs.

#### Defined in

src/lib/api/Context.ts:67

___

### modules

▸ **modules**(): readonly [`Module`](Module.md)[]

Gets a readonly array of all modules that are currently in this context.

#### Returns

readonly [`Module`](Module.md)[]

A readonly array of modules.

#### Defined in

src/lib/api/Context.ts:60
