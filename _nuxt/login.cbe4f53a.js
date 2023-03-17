import{a as n,b as d,f as s,w as i,v as a,t as p,h as u,F as m,o as c}from"./entry.3bb7be15.js";const h={name:"login",data(){return{error:"",email:"",password:""}},mounted(){this.$store.getters["user/loggedIn"]&&this.$router.push("/")},methods:{login(){if(!this.email||!this.password){this.error="Please fill in all fields";return}if(!this.isValidEmail(this.email)){this.error="Please enter a valid email address";return}this.$store.dispatch("user/login",{email:this.email,password:this.password}).then(t=>{if(t.status==="error"){this.error=t.message;return}this.$router.push("/")}).catch(t=>{this.error="An error occurred. Please try again later."})},clearError(){this.error=""},isValidEmail(t){return/\S+@\S+\.\S+/.test(t)}}},g={class:"py-2"},f={class:"py-2"},y={class:"py-2"},_={class:"text-red-500"};function w(t,e,v,x,l,o){return c(),d(m,null,[s("div",g,[i(s("input",{class:"",type:"text",placeholder:"Email",onKeyup:e[0]||(e[0]=(...r)=>o.clearError&&o.clearError(...r)),"onUpdate:modelValue":e[1]||(e[1]=r=>l.email=r)},null,544),[[a,l.email]])]),s("div",f,[i(s("input",{class:"",type:"password",placeholder:"Password",onKeyup:e[2]||(e[2]=(...r)=>o.clearError&&o.clearError(...r)),"onUpdate:modelValue":e[3]||(e[3]=r=>l.password=r)},null,544),[[a,l.password]])]),s("div",y,[s("button",{class:"bg-green-500 p-2 w-full text-white font-bold hover:bg-opacity-75",onClick:e[4]||(e[4]=(...r)=>o.login&&o.login(...r))}," Login ")]),s("div",{class:u({"py-2":l.error})},[s("p",_,p(l.error),1)],2)],64)}const b=n(h,[["render",w]]);export{b as default};
