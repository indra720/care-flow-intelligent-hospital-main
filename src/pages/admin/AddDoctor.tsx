import React, { useState } from 'react'

const AddDoctor = () => {

  const [formdata,setformdata]=useState({
    name:"",
    email:"",
    specialty:"",
    Patients:"",
    Rating:"",
    status:""
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
  }
  if (!formdata.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
    newErrors.email = "Email is invalid";
  }
  if (!formdata.specialty.trim()) {
    newErrors.specialty = "Specialty is required"; // ✅ Fixed spelling
  }
  if (!formdata.Patients.trim()) {
    newErrors.Patients = "Patients is required";
  }
  if (!formdata.Rating.trim()) {
    newErrors.Rating = "Rating is required";
  }
  if (!formdata.status.trim()) {
    newErrors.status = "Status is required";
  }

  return newErrors;
};


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
        specialty: "",
        Patients: "",
        Rating: "",
        status: ""
      })
    }
  };
  return ( 
    <div className='mx-10'>
      <form action="" onSubmit={handlesubmit} className=' border border-gray-500 m-5 p-5 rounded-lg w-full md:w-1/2  mx-auto '>
        <div className='grid grid-cols-1 '>
          <label htmlFor="name" className=' font-semibold italic my-1'>Name</label>
          <input required type="text" value={formdata.name} onChange={handleChange} name="name"  className='outline-0 border border-gray p-2 rounded-sm hover:border-blue-300 my-1'/>
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          
          <label htmlFor="email" className=' font-semibold italic my-1'>Email</label>
          <input required type="email" value={formdata.email} onChange={handleChange} name="email"  className='outline-0 border border-gray p-2 rounded-sm hover:border-blue-300 my-1'/>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          
          <label htmlFor="specialty" className=' font-semibold italic my-1'>Specialty</label>
          <select required value={formdata.specialty} onChange={handleChange} name="specialty"  className='outline-0 border border-gray p-2 rounded-sm hover:border-blue-300 my-1'>
            <option value="">Select Specialty</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Dermatology">Dermatology</option>
            <option value="General Medicine">General Medicine</option>
          </select>
          {errors.specialty && <p className="text-red-500 text-sm">{errors.specialty}</p>}
          
          <label htmlFor="Patients" className=' font-semibold italic my-1'>Patients</label>
          <input required type="text" value={formdata.Patients} onChange={handleChange} name="Patients"  className='outline-0 border border-gray p-2 rounded-sm hover:border-blue-300 my-1'/>
          {errors.Patients && <p className="text-red-500 text-sm">{errors.Patients}</p>}
          
          <label htmlFor="Rating" className=' font-semibold italic my-1'>Rating</label>
          <select required  value={formdata.Rating} onChange={handleChange} name="Rating"  className='outline-0 border border-gray p-2 rounded-sm hover:border-blue-300 my-1'>
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors.Rating && <p className="text-red-500 text-sm">{errors.Rating}</p>}
          
          <label htmlFor="status" className=' font-semibold italic'>Status</label>
          <select required  value={formdata.status} onChange={handleChange} name="status"  className='outline-0 border border-gray p-2 rounded-sm hover:border-blue-300'>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}

        </div>
        <button  className='border font-bold my-5 p-3 rounded-md bg-blue-500 text-white hover:bg-transparent hover:border-blue-500 hover:shadow-md hover:text-black' type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddDoctor