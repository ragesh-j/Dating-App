import { useEffect, useState } from "react";
import employementStyle from "./employement.module.css";
import { useNavigate } from "react-router-dom";

function EmployementDetail() {
    const navigate=useNavigate()
  const [employement, setEmployement] = useState("");
  const [employeedetail, setEmployeeDetail] = useState({
    companyName: "",
    designation: "",
    location: "",
  });
  const [jobLevel, setJobLevel] = useState("");
  const[valid,setValid]=useState("")

  const handleChange = (e) => {
    setEmployement(e.target.value);
  };

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetail({
      ...employeedetail,
      [name]: value,
    });
  };

  const handleJobChange = (e) => {
    setJobLevel(e.target.value);
  };
  const isValid=()=>{
    if(!employement){
        setValid("Please select any of the option")
        return true
    }else if (employement === "Employee/Employer") {
        if (!employeedetail.companyName || !employeedetail.designation || !employeedetail.location) {
          setValid("Please fill in all fields for Employee/Employer.");
          return true;
        }
  }else if (employement === "Job seeker") {
    if (!jobLevel) {
      setValid("Please select a job level.");
      return true;
    }}
    setValid("")
    return false
    
}

  const handleSubmit = async () => {
    const token = localStorage.getItem('jwtToken');
    const data = employement === "Employee/Employer" ? employeedetail : { level: jobLevel };
    data.employement = employement;
    if(isValid()) return
    try {
      const response = await fetch('http://localhost:8000/employement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      if(response.status=='403'){
        navigate("/login")
      }
      if(response.ok){
        const result = await response.json();
        console.log(result)
        navigate("/purpose")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

 

  useEffect(()=>{
    const urlParams=new URLSearchParams(window.location.search)
    const token=urlParams.get('token')

    if(token){
        localStorage.setItem('jwtToken',token)
    }

},[])
  return (
    <div className={employementStyle.main_container}>
        {valid&&<div className={employementStyle.err_msg}>{valid}</div>}
      <div className={employementStyle.section}>
        <label>
          <input
            type="radio"
            value="Employee/Employer"
            checked={employement === "Employee/Employer"}
            onChange={handleChange}
            className={employementStyle.radio_input}
          />
          Employee/Employer
        </label>
        {employement === "Employee/Employer" && (
          <div className={employementStyle.employee_detail}>
            <div className={employementStyle.input_container}>
              <input
                name="companyName"
                placeholder="Company Name"
                onChange={handleEmployeeChange}
                className={employementStyle.input_field}
              />
            </div>
            <div className={employementStyle.input_container}>
              <input
                name="designation"
                placeholder="Designation"
                onChange={handleEmployeeChange}
                className={employementStyle.input_field}
              />
            </div>
            <div className={employementStyle.input_container}>
              <input
                name="location"
                placeholder="Location"
                onChange={handleEmployeeChange}
                className={employementStyle.input_field}
              />
            </div>
          </div>
        )}
      </div>
      <div className={employementStyle.section}>
        <label>
          <input
            type="radio"
            value="Job seeker"
            checked={employement === "Job seeker"}
            onChange={handleChange}
            className={employementStyle.radio_input}
          />
          Job seeker
        </label>
        {employement === "Job seeker" && (
          <div className={employementStyle.jobSeeker_details}>
            <h4>Expertise Level</h4>
            <div className={employementStyle.radio_container}>
              <label>
                <input
                  type="radio"
                  value="Beginner"
                  checked={jobLevel === "Beginner"}
                  onChange={handleJobChange}
                  className={employementStyle.radio_input}
                />
                Beginner
              </label>
              <label>
                <input
                  type="radio"
                  value="Intermediate"
                  checked={jobLevel === "Intermediate"}
                  onChange={handleJobChange}
                  className={employementStyle.radio_input}
                />
                Intermediate
              </label>
              <label>
                <input
                  type="radio"
                  value="Expert"
                  checked={jobLevel === "Expert"}
                  onChange={handleJobChange}
                  className={employementStyle.radio_input}
                />
                Expert
              </label>
            </div>
          </div>
        )}
      </div>
      <div>
        <button onClick={handleSubmit} className={employementStyle.button}>Submit</button>
      </div>
    </div>
  );
}

export default EmployementDetail;