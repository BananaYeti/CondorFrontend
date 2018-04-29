import {connect} from 'react-redux';
import React, {Component} from 'react';

import commands from '../../modules/commands';

var mech = {
    name:'My Super Cool Mech',
    hardpoints:[
        {
            name:"Armotron 3000",
            hardpoints:[
                {
                    name:"gun",
                    hardpoints:[
                        {name:"Advanced Stabilizer"},
                        {
                            name:"Armotron 3000",
                            hardpoints:[
                                {
                                    name:"gun",
                                    hardpoints:[
                                        {name:"Advanced Stabilizer"},
                                        {name:"Advanced Stabilizer"}
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {name:"Battery"},
        {
            name:"Armotron 3000",
            hardpoints:[
                {
                    name:"gun",
                    hardpoints:[
                        {name:"Advanced Stabilizer"},
                        {name:"Advanced Stabilizer"},
                        {
                          name:"Advanced Stabilizer",
                          hardpoints:[
                            {name:"Advanced Stabilizer"},
                            {
                              name:"Advanced Stabilizer",
                              hardpoints:[
                                {name:"Advanced Stabilizer"},
                                {name:"Advanced Stabilizer"}
                              ]
                            }
                          ]
                        },
                        {name:"Advanced Stabilizer"},
                        {name:"Advanced Stabilizer"},
                        {name:"Advanced Stabilizer"}
                    ]
                }
            ]
        },
        {
            name:"Leg Part Mk.5",
            hardpoints:[
                {name:"Ultra Jump Hydraulics"}
            ]
        },
        {name:"Battery"}
    ]
}




class MechDisplay extends Component{

  isLast(node, parent) {
    if (parent.hardpoints[parent.hardpoints.length-1] == node) {
      return true;
    } else {
      return false;
    }
  }

  traverseHelper(rootNode) {
    var str="";
    for (let child of rootNode.hardpoints) {
      str+=this.traverse(child, "", rootNode);
    }
    return str;
  }

  traverse(node, prefix, parent) {
      var str="";
      if (node.hardpoints) {
        str +=
          prefix+
          (this.isLast(node, parent) ? "└┬ " : "├┬ ")+
          node.name+"\n";
        for (let child of node.hardpoints) {
          str += this.traverse(
            child,
            prefix+(this.isLast(node, parent) ? " " : "│"),
            node
          );
        }
      } else {
        str +=
          prefix+
          (this.isLast(node, parent)? "└─ " : "├─ ")+
          node.name+"\n";
        if (this.isLast(node, parent)) {
          str +=prefix+"\n";
        } else {
          if(parent === mech) {
            str +="│\n";
          }
        }
      }

      return str;
  }

  render(){
    return (
      <div className="game bot">
        <pre>
          ┌ {mech.name}<br/>
          │<br/>
          {this.traverseHelper(mech)}
        </pre>
      </div>
    );
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MechDisplay);
