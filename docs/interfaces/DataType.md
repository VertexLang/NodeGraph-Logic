[nodegraph-logic](../README.md) / [Exports](../modules.md) / DataType

# Interface: DataType

An abstract identifier that indicates how a unit of data should be used.

## Table of contents

### Methods

- [module](DataType.md#module)
- [name](DataType.md#name)
- [rename](DataType.md#rename)

## Methods

### module

▸ **module**(): [`Module`](Module.md)

Gets the module that this data type is defined in.

#### Returns

[`Module`](Module.md)

The module.

#### Defined in

src/lib/api/DataType.ts:29

___

### name

▸ **name**(): `string`

Gets the name of this data type.

**`remarks`**

This should be a unquie identifier within a module.

**`see`** [Module](Module.md), [rename](DataType.md#rename)

#### Returns

`string`

The name.

#### Defined in

src/lib/api/DataType.ts:22

___

### rename

▸ **rename**(`name`): `Result`<`void`, [`IdentifierError`](../classes/IdentifierError.md)\>

Sets a new name for this data type.

**`see`** [name](DataType.md#name)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Result`<`void`, [`IdentifierError`](../classes/IdentifierError.md)\>

An [IdentifierError](../classes/IdentifierError.md) if there is already a data type in the
         module this data type is in with the given name.

#### Defined in

src/lib/api/DataType.ts:39
