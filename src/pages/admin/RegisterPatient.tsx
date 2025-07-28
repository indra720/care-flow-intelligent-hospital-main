import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterPatient = ({onClose}) => {

  const [formdata,setformdata]=useState({
        name: "",
        email: "",
        number: "",
        bloodtype: "",
        date: "",
        condition: "",
        gender:"",
      })
  
  const [errors, setErrors] = useState({});

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setformdata({
      ...formdata,[name]:value
    })
  }
           

const validate = () => {
  const newErrors = {};

 if (!formdata.name.trim()) {
  newErrors.name = "Name is required";
} else if (!/^[a-zA-Z\s]+$/.test(formdata.name)) {
  newErrors.name = "Only alphabets are allowed";
}
  if (!formdata.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
    newErrors.email = "Email is invalid";
  }
  if (!formdata.number.trim()) {
    newErrors.number = "number is required"; 
  }
  if (!formdata.date.trim()) {
    newErrors.date = "date is required";
  }
  if (!formdata.bloodtype.trim()) {
    newErrors.bloodtype = "bloodtype is required";
  }
  if (!formdata.condition.trim()) {
    newErrors.condition = "condition is required";
  }

  return newErrors;
};


const navigate = useNavigate()
   const handlesubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log('Form Submitted:', formdata);
      setformdata({
        name: "",
        email: "",
        number: "",
        bloodtype: "",
        date: "",
        condition: "",
        gender:""
      })
     onClose()
    }
   
    
  };
  return ( 
   <div  className='bg-blue-300 w-full p-4'>
    <div className='mx-10 '>
    <fieldset className=' p-5 border-2 border-gray-300 bg-white rounded-md w-full lg:w-full mx-auto' >
      <legend className="text-2  text-center font-semibold text-blue-600 px-2">Add Doctor</legend>

    
      <form action="" onSubmit={handlesubmit} >
        <div className='grid grid-cols-1 '>
          <label htmlFor="name" className=' font-semibold italic my-1'>Name</label>
          <input required type="text" value={formdata.name} onChange={handleChange} name="name"  className='outline-0 border border-gray p-2 rounded-sm hover:border-blue-300 my-1'/>
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          
         <div className='flex flex-col'>
           <label htmlFor="number" className=' font-semibold italic my-1'>Age/Gender</label>
          <input required type="number" value={formdata.number} min={1} onChange={handleChange} name="number"  className='outline-0 border border-gray p-2 rounded-sm hover:border-blue-300 my-1'/>

          {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}

          <div className='flex justify-start items-center gap-3'>
            <label htmlFor="male">Male</label>
             <input type="radio" name='Gender' value='Male' onChange={handleChange} />
             <label htmlFor="female">Female</label>
          <input type="radio" name='Gender' value='female' onChange={handleChange} />
          </div>
         </div>

          <label htmlFor="email" className=' font-semibold italic my-1'>Email</label>
          <input required type="email" value={formdata.email} onChange={handleChange} name="email"  className='outline-0 border border-gray p-2 rounded-sm hover:border-blue-300 my-1'/>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          
          <label htmlFor="bloodtype" className=' font-semibold italic my-1'>Blood Type</label>
          <select required value={formdata.bloodtype} onChange={handleChange} name="bloodtype"  className='outline-0 border border-gray p-2 rounded-sm hover:border-blue-300 my-1'>
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="O+">O+</option>
            <option value="B+">B+</option>
            <option value="O-">O-</option>
            <option value="B-">B-</option>

          </select>
          {errors.bloodtype && <p className="text-red-500 text-sm">{errors.bloodtype}</p>}

          <label htmlFor="date" className=' font-semibold italic my-1'>Last Visit</label>
          <input required type="date" value={formdata.date} onChange={handleChange} name="date"  className='outline-0 border border-gray p-2 rounded-sm hover:border-blue-300 my-1'/>
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}


          <label htmlFor="condition" className=' font-semibold italic my-1'>Conditions</label>
          <select required value={formdata.condition} onChange={handleChange} name="condition"  className='outline-0 border border-gray p-2 rounded-sm hover:border-blue-300 my-1'>
            <option value="">Select Conditions</option>
            <option value="Hypertension">Hypertension</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Healthy">Healthy</option>
          </select>


        </div>
        <button  className='border font-bold my-5 p-3 rounded-md bg-blue-500 text-white hover:bg-transparent hover:border-blue-500 hover:shadow-md hover:text-black' type='submit'>Submit</button>
      </form>
    
    </fieldset>
    </div>
    

   </div>
  )
}

export default RegisterPatient;