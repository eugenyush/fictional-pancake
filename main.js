Vue.component('registr-form',{
    template:`
    <div class="registr-form">
      <div class="registr-form-container">
      <div class="registr-form-headr">
      <div class="title">Registration</div>
      <div class="subtitle">Already have an account?<a href="#"> Log in</a></div>
      </div>
      <form @submit.prevent="onSubmit">

      <p class="error" v-if="errors.length">
            <b>Please fix the following error(s):</b>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>
  
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="Enter your name" @change="onInput" @blur ="onInput">
    </p>
  
    <p>
      <label for="email">Email:</label>
      <input id="email" v-model="email" placeholder="Enter your Email" @change="onInput" @blur ="onInput">
    </p>
  
    <p>
    <label for="number">Phone number:</label>
    <input id="number" v-model="number" placeholder="Enter your phone number" @change="onInput" @blur ="onInput">
    </p>
  
    <p>
      <label for="language">Language:</label>
      <select id="language" v-model.number="language" @blur ="onInput" @change="onInput">
        <option>Russian</option>
        <option>English</option>
        <option>Japanese</option>
        <option>Chinese</option>
      </select>
    </p>
    <p class="checkbtn">
    <label for="checkbox">I accept the <a href="#"> terms</a> of use</label>
    <input type="checkbox" v-model = "checkbtn" @change="onInput">
    </p>
  
    <p>
       <button type="submit" class="registerbtn":class="{disabledButton: !filledIn }" :disabled="!filledIn">Register</button>
    </p>
    
      </form>
      </div>
    </div>
    `,
    data(){
        return{
            name: null,
            email: null,
            number: null,
            language: null,
            checkbtn: null,
            errors: [],
            filledIn: false
        }
    },
    methods:{
        onSubmit(){
            this.errors = []
            if(this.name && this.email && this.number && this.language && this.validEmail(this.email) && this.validNumber(this.number) && this.validName(this.name)){
                 let formReg = {
                name: this.name,
                email: this.emali,
                number: this.number,
                language: this.language
            }
            this.$emit('registr-submitted',formReg)
            this.name = null
            this.email = null
            this.number = null
            this.language = null
            }else{
                if(!this.name) {
                  this.errors.push("A name is required.");
                }else if(!this.validName(this.name)){
                  this.errors.push('Enter the correct Name.');
                }
                if(!this.email){
                  this.errors.push("Email required.");
                }else if(!this.validEmail(this.email)){
                  this.errors.push('Enter the correct email address.');
                }
                if(!this.number) {
                  this.errors.push("A phone number is required.");
                }else if(!this.validNumber(this.number)){
                  this.errors.push('Enter the correct phone number.');
                }
                if(!this.language) {
                  this.errors.push("Choose a language.");}
                  
            }
           
        },
        validEmail(email){
          var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        },
        validNumber(number){
          var re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
          return re.test(number);
        },
        validName(name){
          var re = /[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)/;
          return re.test(name);
        },
        onInput(){
          if(this.checkbtn){
            this.filledIn = true;
          }else{
            this.filledIn = false;
          }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        register:[]
    },
    methods: {
        addRegistr(formReg){
            this.register.push(formReg)
        }
    }
  })
  