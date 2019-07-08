export const validator = (name, email, password, confirm_password) => {

    const error = [];
    let values = [name, email, password, confirm_password];

    /*-----CHECK IF VALUE IS EMPTY--------------- */
    values.forEach( val => {
     if(val.value.length < 1) {
        error.push(`${val.errorLabel} is required`)
      }

    })

    /*------CHECK IF EMAIL IS VALID------------ */
    let emailIsValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email.value.trim())
    if(!emailIsValid){
      error.push('Please, enter a valid email')
    }

    /*-------CHECK NAME LENGTH------ */
    if(name.value.trim().length < 5) {
      error.push('Name shoud be at least 5 characters long')
    }

    /*-----CHECK PASSWORD LENGTH------*/
    if(password.value.trim().length < 5 ){
      error.push('Password should be at least 5 characters long')
    }

    /*---CHECK IF THE TWO PASSWORDS ARE EQUAL------*/

    if ( password.value.trim() !== confirm_password.value.trim()){
      error.push('Please enter the same password')
    }
    
    return error;
}


