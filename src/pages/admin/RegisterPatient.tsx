import React, { useRef, useState } from 'react'
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
        status:"",
      })
  
  const [errors, setErrors] = useState({});

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setformdata({
      ...formdata,[name]:value
    })
  }
 
  
  // date picker anywhere click on input

  const customDateInput = ()=>{
    const inputref = useRef(null);

     const habdledivclick=()=>{
    inputref.current.showPicker();
  }
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
  if (!formdata.status.trim()) {
    newErrors.status = "Status is required";
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
        gender:"",
        status:""
      })
     onClose()
    }
   
    
  };
  return ( 
   <>
    <div className='w-90  overflow-hidden sm:min-h-screen  mx-auto'>
    <fieldset className=' px-5 bg-transparent rounded-md  mx-auto' >
      <legend className="text-center  font-bold py-1">Register New Patient</legend>

    
      <form action="" onSubmit={handlesubmit} >
        <div className='grid grid-cols-1  sm:gap-2 lg:gap-1'>
          <label htmlFor="name" className=' font-semibold  my-'>Name</label>
          <input required type="text" value={formdata.name} onChange={handleChange} name="name"  className='outline-0 border-2 border-gray p-2 rounded-sm hover:border-blue-400  '/>
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          
         <div className='flex flex-col'>
           <label htmlFor="number" className=' font-semibold  my-'>Age/Gender</label>
          <input required type="number" value={formdata.number} min={1} onChange={handleChange} name="number"  className='outline-0 border-2 border-gray p-2 rounded-sm hover:border-blue-400  '/>

          {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}

          <div className='flex justify-start items-center gap-3'>
            <label htmlFor="male">Male</label>
             <input type="radio" name='Gender' value='Male' onChange={handleChange} />
             <label htmlFor="female">Female</label>
          <input type="radio" name='Gender' value='female' onChange={handleChange} />
          </div>
         </div>

          <label htmlFor="email" className=' font-semibold  my-'>Email</label>
          <input required type="email" value={formdata.email} onChange={handleChange} name="email"  className='outline-0 border-2 border-gray p-2 rounded-sm hover:border-blue-400  '/>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          
          <label htmlFor="bloodtype" className=' font-semibold  my-'>Blood Type</label>
          <select required value={formdata.bloodtype} onChange={handleChange} name="bloodtype"  className='outline-0 border-2 border-gray p-2 rounded-sm hover:border-blue-400  '>
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="O+">O+</option>
            <option value="B+">B+</option>
            <option value="O-">O-</option>
            <option value="B-">B-</option>

          </select>
          {errors.bloodtype && <p className="text-red-500 text-sm">{errors.bloodtype}</p>}

          <label htmlFor="date" className=' font-semibold  my-'>Last Visit</label>
          <input required type="date" min={new Date().toISOString().split("T")[0]} value={formdata.date} onChange={handleChange} name="date"  className='outline-0 border-2 border-gray p-2 rounded-sm hover:border-blue-400  '/>
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}


          <label htmlFor="condition" className=' font-semibold  my-'>Conditions</label>
          <select required value={formdata.condition} onChange={handleChange} name="condition"  className='outline-0 border border-gray p-2 rounded-sm hover:border-blue-300 '>
            <option value="">Select Conditions</option>
            <option value="Hypertension">Hypertension</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Healthy">Healthy</option>
          </select>

          <label htmlFor="status" className=' font-semibold my-'>Status</label>
          <select required  value={formdata.status} onChange={handleChange} name="status"  className='outline-0 border-2 border-gray p-2 rounded-sm hover:border-blue-40 0'>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">Inactive</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}


        </div>
        <div className='flex justify-center '>
         <button  className='border font-bold my-5 p-3 rounded-md bg-blue-500 text-white     hover:shadow-md w-full ' type='submit'>Register Patient</button>
       </div>
      </form>
    
    </fieldset>
    </div>
    

   </>
  )
}

export default RegisterPatient;











