import React, { Component } from 'react';
import './Delivery.css';
import Button from '../../../components/Button/Button';
import UserInfo from '../Recap/UserInfo/UserInfo';

const WEEKDAY = new Array(7)
WEEKDAY[0] =  "Sunday";
WEEKDAY[1] = "Monday";
WEEKDAY[2] = "Tuesday";
WEEKDAY[3] = "Wednesday";
WEEKDAY[4] = "Thursday";
WEEKDAY[5] = "Friday";
WEEKDAY[6] = "Saturday";


 class Delivery extends Component {

   

    state = {
        delivery: [],
        firstOption: true,
        secondOption: false,


        cheapest: [],
        fastest: []
    }

    componentWillMount(){ 
        let today = new Date();

        let cheapestFirstDate = new Date();
        let cheapestLastDate = new Date();
        let fastestDate = new Date();

        cheapestFirstDate.setDate(today.getDate() + 10);
        cheapestLastDate.setDate(today.getDate() + 15);
        fastestDate.setDate(today.getDate() + 2)

        let deliveryDatesArray = [
            {
                name: 'cheapFirstDate',
                date: cheapestFirstDate
            }, 
            {
                name: 'cheapLastDate',
                date: cheapestLastDate
            },
            {
                name: 'asapDate',
                date: fastestDate
            }
        ]

        let weekday = WEEKDAY;
        let deliveryDatesOutput = [];

        deliveryDatesArray.map( d => {
            let weekDayInNumber = d.date.getDay();
            let dateData = {
                name: d.name,
                templateLitteral: `${weekday[weekDayInNumber]}, ${d.date.toString().slice(4, 7)} ${d.date.getDate()}`       
            }
            deliveryDatesOutput.push(dateData)
        })

        let cheapFirstDateOutput = deliveryDatesOutput.find( o => o.name === 'cheapFirstDate');
        let cheapLastDateOutPut = deliveryDatesOutput.find( o => o.name === 'cheapLastDate');
        let cheapestDateDelivery = `${cheapFirstDateOutput.templateLitteral} - ${cheapLastDateOutPut.templateLitteral}`;
        let cheapestDeliveryMethod = [cheapestDateDelivery, 10];

        let fastestDateOutPut = deliveryDatesOutput.find( o => o.name === 'asapDate');     
        let fastestDeliveryMethod = [fastestDateOutPut.templateLitteral, 20]

        this.setState({
            delivery: {
                    date: cheapestDeliveryMethod[0],
                    price: cheapestDeliveryMethod[1]},
            cheapest: {
                    date: cheapestDeliveryMethod[0],
                    price: cheapestDeliveryMethod[1]
            },
            fastest: {
                    date: fastestDeliveryMethod[0],
                    price: fastestDeliveryMethod[1]
            }

        }, () => {
            console.log(this.state)
        })  
    }



    toggle(event){

        let date;
        let price;

        if(event === 'fastest'){
            date = this.state.fastest.date;
            price = this.state.fastest.price
        }

        if(event === 'cheapest'){
            date = this.state.cheapest.date;
            price= this.state.cheapest.price
        }

            this.setState( prevState => ({
               ...prevState,
                delivery: {
                    ...prevState.delivery,
                    date: date,
                    price: price
                },
                firstOption: !this.state.firstOption,
                secondOption: !this.state.secondOption
            }), () => {
                console.log(this.state.delivery)
            })
            
            
    }


    render() {

        return (
            <div className="delivery">
                <UserInfo />
                <section>
                    <div className="checkout__title__primary">DELIVERY METHOD</div>
                    <div>Choose a delivery option</div>

                <form>
                        <div className="delivery__option">    
                                <input type="checkbox" 
                                       name="cheapest" 
                                       value={this.state.cheapest}
                                       checked={this.state.firstOption}
                                       onChange={this.toggle.bind(this, 'cheapest')}/>

                                <label for="cheapest">
                                    <div>{`${this.state.cheapest.date}`}</div>
                                    <div>${`${this.state.cheapest.price}`}</div>
                                </label>
                        </div>

                        <div className="delivery__option">     
                                <input type="checkbox" 
                                       name="fastest" 
                                       value={[this.state.fastest]}
                                       checked={this.state.secondOption}
                                       onChange={this.toggle.bind(this, 'fastest')}/>

                                <label for="fastest">
                                    <div>{`${this.state.fastest.date}`}</div>
                                    <div>${`${this.state.fastest.price}`}</div>
                                </label>
                        </div>
                        <Button type="submit"
                                color="primary"
                                onClick={this.props.onValidate.bind(this, 'payment')}>
                                Next
                        </Button>
                </form>
                    

                    

                </section>
            </div>
        )
    }
}

export default Delivery;
