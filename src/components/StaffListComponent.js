import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { STAFFS } from './shared/staffs';

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.StaffLists = STAFFS;
        this.state = {
            selectedStaff: null,
          };
    }
    onStaffSelect(staff) {
        this.setState ({
          selectedStaff: staff
        });
      }    
     render2 (selectedStaff) {
         if (selectedStaff != null) {
            return (
                <div>
                <p>{selectedStaff.id}</p>
                </div>
            )
         }
     }
    render() {
        const StaffNV = this.StaffLists.map((staff) => {
            return (
                <div className="StaffList"> 
                    <div>  
                        <Card onClick={() => this.onStaffSelect(staff)}>
                        <p>{staff.name}</p>
                        </Card>
                    </div>
                    
                </div>
                
            );
        })
        return (
            <div>
            {StaffNV}
            <div id="rootht">{this.render2 (this.state.selectedStaff)}</div>
            </div>
        )
    }
    
    
}
// return (
//     <div className="StaffList"> 
//        {
//            this.StaffLists.map((props) => (
//            <div>    
//                 <p>{props.name}</p>
//                 <Card onClick={() => this.onStaffSelect()}>
//                 <CardTitle>{props.name}</CardTitle>
//                 </Card>
//            </div>
//            ))
//        }
//        <div id="rootht"></div>
//     </div>
// );
// })

export default StaffList;