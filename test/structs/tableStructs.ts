export interface TableAttributes {
    id: string;
    foreign_key: string; // can be 0
    columns: string[];
    columnTypes: TypeEnum[];
    protected: boolean; // if can
}

export interface Column {
    name: string;
    type: TypeEnum;
}

export enum TypeEnum {
    String,
    Number
}

export interface Row {
    content: TypeEnum;
}
