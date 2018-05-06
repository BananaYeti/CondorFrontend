import {connect} from 'react-redux';
import React, {Component} from 'react';

import commands from '../../modules/commands';


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
          if(parent === this.props.mechInventory) {
            str +="│\n";
          }
        }
      }
      return str;
  }

  render(){
    console.log(this.props.mechInventory);
    return (
      <div className="game bot">
        <pre>
          ┌ {this.props.mechInventory.name}<br/>
          │<br/>
          {this.traverseHelper(this.props.mechInventory)}
        </pre>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mechInventory:state.mechInventory
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MechDisplay);
