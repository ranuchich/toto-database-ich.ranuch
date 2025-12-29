import axiox from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth/authContext.jsx";

const TaskPage = () => {
 const [description, setDescription] = useState('');
 const [date, setDate] = useState('');
 const [isSubmited, setisSubmited] = useState('');
 let navigate = useNavigate();
 const { user } = useAuth();

 const handleDescription = (e) => {
    setDescription(e.target.value);
 }

 const handleDate = (e) => {
    setDate(e.target.value);
 }

 const handleAddEdit = () => {
    if (description && date) {
        setisSubmited(true);
        const datas = {
            "description": description,
            "date": date,
        };
        const header = {
            headers: {
                'Authorization': 'Bearer ' + user?.token
            }
        }
        axiox.post('https://api-todolist.e-khmer.com/api/task/create', datas, header). then((res)=> {
            if (res?.data?.success) {
                navigate("/dashboard");
            }
            setisSubmited(false);
        }).catch((err) => {
            console.log("Error:=>", err);
            setisSubmited(false);
        });
      }
    }

 return (
  <div className="container mt-3">
   <form action="#">
    <div class="mb-3 mt-3">
     <label for="description"><span className='text-danger'>*</span> Description:</label>
     <input onChange={(e) => handleDescription(e)}
      value={description}
      type="text"
      class="form-control form-control-lg"
      id="description"
      placeholder="Ex: CRUDE Category"
      name="description" />
    </div>
    <div class="mb-3">
     <label for="date"><span className='text-danger'>*</span> Date:</label>
     <input onChange={(e) => handleDate(e)}
      value={date}
      type="date"
      class="form-control form-control-lg"
      id="date"
      placeholder="date"
      name="date" />
    </div>
    <div className='d-grid'>
     <button
      disabled={isSubmited}
      onClick={() => handleAddEdit()}
      type="button"
      class="btn btn-primary btn-block btn-lg"
     >
      {isSubmited &&
       <i class="fa-solid fa-spinner fa-spin"></i>
      }
      Add
     </button>
    </div>
   </form>
  </div>
 )
}

export default TaskPage;