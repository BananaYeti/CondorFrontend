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

  isLast(part, parent) {
    if (parent.hardpoints[parent.hardpoints.length-1] == part) {
      return "└";
    } else {
      return "├";
    }
  }

  isEnd(part, parent) {
    if (parent.hardpoints[parent.hardpoints.length-1] == part) {
      return "";
    } else {
      return "│";
    }
  }

  isParent(part) {
    if (part.hardpoints) {
      return "┬ ";
    } else {
      return "─ ";
    }
  }

  traversePart(part, parent, depth) {
      if (part.hardpoints) {
        return (
          part.hardpoints.map((item, index) => (
            <div>
              |{Array(depth).join(" ")}{this.isLast(item,part)}{this.isParent(item)}{item.name}<br/>
              {this.traversePart(item, part, depth+1)}
            </div>
          ))
        );
      }
  }

  render(){
    return (
      <div className="game bot">
      ┌ My Super Cool Mech<br/>
      │<br/>
        {
          mech.hardpoints.map((part, index) => (
            <div key={index}>
              {this.isLast(part,mech)}{this.isParent(part)}{part.name}<br/>
              {this.traversePart(part, mech, 1)}
              {this.isEnd(part, mech)}
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MechDisplay);
