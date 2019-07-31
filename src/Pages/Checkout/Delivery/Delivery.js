import React, { Component } from 'react';
import './Delivery.css';
import Button from '../../../components/Button/Button';

 class Delivery extends Component {
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


                    <div className="delivery__option">    
                            <input type="checkbox" id="1st" name="1st"
                                    checked />
                            <label for="1st">
                                <div>Wednesday, Aug. 14 - Tuesday, Aug. 20</div>
                                <div>$10</div>
                            </label>
                    </div>

                    <div className="delivery__option">     
                            <input type="checkbox" id="second" name="second"/>
                            <label for="second">
                                <div>Monday, Aug. 5</div>
                                <div>$20</div>
                            </label>
                    </div>

                    <Button>
                        Next
                    </Button>

                </section>
            </div>
        )
    }
}

export default Delivery;
