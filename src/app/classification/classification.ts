export class Classification{
  ID : number = 0
  Name: string = ''
  Parent : number = 0
}

export interface organizationNode{
  id:number;
  name: string;
  children?: organizationNode[];
}

/** Flat node with expandable and level information */
export interface ExpandableFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
