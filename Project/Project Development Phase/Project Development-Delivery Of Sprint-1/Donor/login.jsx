import React, {useState} from 'react';
import './form.css';
import { useHistory } from 'react-router-dom';

const RequestForm = () =>{
    const history=useHistory();
    const [user,setUser] = useState({
        name:"",
        username:"",
        password:"",
        gender:"",
        age:"",
        bloodgroup:"",
        positivedate:"",
        phone:"",
        state:"",
        city:"",
        error:""
    })
    let name,value;
    const handleInputs=(e)=>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;
        setUser({...user, [name] : value });
    }

    function handleValidation()
    {
        var formIsValid = true;
        var pdate=new Date(user.positivedate);
        var today=new Date();
        if(pdate.getFullYear()<=today.getFullYear())
        {
            if(pdate.getMonth()<=today.getMonth())
            {
                    formIsValid=true;
            }
            else
            {
                formIsValid=false;
                user.error="Please enter valid COVID-19 positive date";
            }
        }
        else
        {
            formIsValid=false;
            user.error="Please enter valid COVID-19 positive date";
        }
        return formIsValid;
    }
    const PostData = async(e) =>{
        e.preventDefault();
        if(!handleValidation())
        {
            alert(user.error);
        }
        else
        {
        const {name ,username,password, gender, age, bloodgroup, positivedate, phone, state, city}= user;

        const res=await fetch("http://localhost:5002/plasma/createrequester", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body:JSON.stringify({
                name ,username,password, gender, age, bloodgroup, positivedate, phone, state, city
            })
        });

        const data=await res.json();
        console.log(res.status);
        if(res.status === 422) 
        {
            alert(data.error);
        }
        else
        {
            alert("Registration successful");
            history.push("getrequesters");
        }
        }
    }

 /*   const PostData = async(e) => {
        e.preventDefault();
        console.log(user);
        const {name ,username,password, gender, age, bloodgroup, positivedate, phone, state, city}= user;
        

        fetch("http://localhost:5002/plasma/createrequester",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body:JSON.stringify({
                name , gender, age, bloodgroup, positivedate, phone, state, city
            }),
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data); 
        })
    }*/
    return(
                <div className="signup-form">
                    <h2 className="heading">Request Plasma</h2>
                <hr />
                <div class="form-group">
                <span className="labels">Name *</span>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <span class="fa fa-user"></span>
      