import React, { Component } from 'react';
import './Delivery.css';
import Button from '../../../components/Button/Button';

 class Delivery extends Component {

    state = {
        delivery: 'fastest',
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
                <section className="delivery__user">
                    <div className="delivery__title">ADDRESS</div>
                    <div className="delivery__user__info--name">Anja Rasoloarivalona</div>
                    <div className="delivery__user__info">4312 Boulevard Edouard-Monpetit</div>
                    <div className="delivery__user__info">Montréal, H3T 1K3</div>
                    <div className="delivery__user__info">Canada</div>
                    <div className="delivery__user__info">438 123 1234</div>
                </section>
                <section>
                    <div className="delivery__title">DELIVERY METHOD</div>
                    <div>Choose a delivery option</div>

                <form>
                        <div className="delivery__option">    
                                <input type="checkbox" 
                                       name="cheapest" 
                                       value="cheapest"
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
                                       value="fastest"
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
