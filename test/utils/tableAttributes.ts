import { TableAttributesStruct } from "../../typechain-types/contracts/DB"
import { Column, TableAttributes, TypeEnum } from "../structs"

const columns: string[] = [
  "id",
  "name",
  "surname",
  "age",
]
const columnTypes: TypeEnum[] = [
  TypeEnum.String,
  TypeEnum.String,
  TypeEnum.String,
  TypeEnum.Number,
]
export const tableAttributes: TableAttributesStruct = {
  id: "1",
  columns,
  protected: false
} 