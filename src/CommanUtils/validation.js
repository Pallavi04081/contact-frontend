
const validation = (input)=>{
     const errors = {};
      
        if (!input.firstname   ) {
          errors.firstname = 'Please Enter firstname';
        } 
        else if(!input.middlename ){
            errors.middlename = 'Please Enter firstname';
        }
        else if(!input.lastname ){
            errors.lastname = 'Please Enter lastname';
        }
        else if (!input.email) {
          errors.EmailId = 'Please Enter Email ID';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)) {
          errors.EmailId = 'Invalid email address';
        }
        else if(!input.password){
            errors.password='Please Enter Password'
        }
        else if(input.password.length<8){
            errors.password='Password must be more than 8 charactor long'
        }
      
        return errors;
    
}

module.exports = {validation}