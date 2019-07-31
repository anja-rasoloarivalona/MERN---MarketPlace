import React, { Component } from 'react';
import './Delivery.css';
import Button from '../../../components/Button/Button';
import UserInfo from '../Recap/UserInfo/UserInfo';

 class Delivery extends Component {

    state = {
        delivery: [
            "Wednesday, Aug. 14 - Tuesday, Aug. 20",
            10
            ],
        firstOption: true,
        secondOption: false 
    }

    componentDidMount(){
        console.log('did mount', this.state.delivery)
    }

    toggle(event){
            this.setState({
                delivery: event.target.value,
                firstOption: !this.state.firstOption,
                secondOption: !this.state.secondOption
            }, console.log(this.state))
    }


    render() {
        return (
            <div className="delivery">
                <UserInfo />
                <section>
                    <div className="delivery__title">DELIVERY METHOD</div>
                    <div>Choose a delivery option</div>

                <form>
                        <div className="delivery__option">    
                                <input type="checkbox" 
                                       name="cheapest" 
                                       value={[
                                        "Wednesday, Aug. 14 - Tuesday, Aug. 20",
                                        10
                                        ]}

                                       checked={this.state.firstOption}
                                       onClick={this.toggle.bind(this)}/>

                                <label for="cheapest">
                                    <div>Wednesday, Aug. 14 - Tuesday, Aug. 20</div>
                                    <div>$10</div>
                                </label>
                        </div>

                        <div className="delivery__option">     
                                <input type="checkbox" 
                                       name="fastest" 
                                       value={[
                                        "Monday, Aug. 5",
                                        20
                                        ]}
                                       checked={this.state.secondOption}
                                       onClick={this.toggle.bind(this)}/>

                                <label for="fastest">
                                    <div>Monday, Aug. 5</div>
                                    <div>$20</div>
                                </label>
                        </div>
                        <Button type="submit">
                                Next
                        </Button>
                </form>
                    

                    

                </section>
            </div>
        )
    }
}

export default Delivery;
