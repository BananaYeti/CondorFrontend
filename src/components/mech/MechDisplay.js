import {connect} from 'react-redux';
import React, {Component} from 'react';

import commands from '../../modules/commands';

var counter = 0;

class MechDisplay extends Component{

  constructor(props){
    super(props);
    this.state = {

    }
  }

  isLast(node, parent) {
    if (parent.hardpoints[parent.hardpoints.length-1] == node) {
      return true;
    } else {
      return false;
    }
  }

  traverseHelper(rootNode) {
    var str="";
    counter = 0;
    for (let child of rootNode.hardpoints) {
      str+=this.traverse(child, "", rootNode, counter);
      counter++;
    }
    return str;
  }

  getLabelString(number){
    var letter = String.fromCharCode('A'.charCodeAt()+(number / 10));
    var number = number % 10;
    return '[' + letter + number + '] ';
  }

  traverse(node, prefix, parent) {
      var str="";
      var label = this.getLabelString(counter);
      if (node && node.hardpoints) {
        str +=
          prefix+
          (this.isLast(node, parent) ? "└┬ " : "├┬ ")+
          label+
          node.name+"\n";
        var subCounter = 1;
        for (let child of node.hardpoints) {
          counter ++;
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
          label+
          (node?node.name:'EMPTY')+"\n";
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
