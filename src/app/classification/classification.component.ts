import { Component, OnInit } from '@angular/core';

import { ClassificationService } from './classification.service';
import { Classification, organizationNode, ExpandableFlatNode } from './classification';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {

  classificationData: Classification [] = [];
  treeData : organizationNode[] = [];

  // *** Tree implementation ***
  private _transformer = (node: organizationNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExpandableFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

// *** Program ***
  constructor(
    private classificationService: ClassificationService,
  ) { }

  hasChild = (_: number, node: ExpandableFlatNode) => node.expandable;

  ngOnInit(): void {
    this.getClassificationData();
  }

  getClassificationData(){
    this.classificationService.getClassification().subscribe((res:any)=>{
      this.classificationData = res.data;
      this.parentData(this.classificationData);
    })
  }
  //parents
  parentData(data:Classification []){
    let parentNode = data.filter(item =>item.Parent ==0);

    parentNode.forEach(element => {

      let childrens: organizationNode[]= this.buildTreeData(element.ID)
      let cData : organizationNode ={
        id: element.ID,
        name: element.Name,
        children: childrens
      }

      this.treeData.push(cData)
    });
    this.dataSource.data = this.treeData;
    console.log(this.treeData)
  }
  //childs
  buildTreeData(parent: number){
    let childsNode = this.classificationData.filter(item =>item.Parent ==parent);

    let childReturn: organizationNode[]=[];

    childsNode.forEach(element => {
      let child: organizationNode[] = this.buildTreeData(element.ID);

      let childToFill: organizationNode = {
        id: element.ID,
        name: element.Name,
        children: child
      }
      childReturn.push(childToFill)
    });

    return childReturn;
  }




}
