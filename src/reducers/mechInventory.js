import {actionTypes} from '../actions/mechInventoryActions';
import mechInventoryModule from '../modules/mechInventory';

var exampleMech = {
    name:'My Super Cool Mech',
    chasis:'BasicChasis10',
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
    ],
    inventory:[
        {name:"Advanced Stabilizer"},
        {name:"Advanced Stabilizer"},
        {name:"Advanced Stabilizer"},
        {name:"Advanced Stabilizer"},
        {name:"Advanced Stabilizer"}
    ],
}





var initialState = {
    inventory:[],
    name:'',
    chasis:null,
    hardpoints:[]
}

const mechInventory = (state = exampleMech, action) => {
    switch(action.type){
        case actionTypes.MECH_INST_PART:
            if(mechInventoryModule.checkValidInstall(state, action.inventorySlot, action.endpoint)){
                var stateCopy = Object.assign({}, state);
                var part = stateCopy.inventory.splice(action.inventorySlot, 1);
                var finalPointIndex = action.endpoint.splice(action.endpoint.length - 1, 1);
                var newParent = mechInventoryModule.getPartMech(action.endpoint);
                newParent.hardpoints[finalPointIndex] = part;
                return stateCopy;
            }

        case actionTypes.MECH_RMV_PART:
            var stateCopy = Object.assign({}, state);
            var finalPointIndex = action.endpoint.splice(action.point.length - 1, 1);
            var newParent = mechInventoryModule.getPartMech(stateCopy, action.point);
            newParent.hardpoints[finalPointIndex] = null;
            return stateCopy;

        case actionTypes.MECH_SWAP_PART:
    
        default:
            return state;
    }
}

export default mechInventory;