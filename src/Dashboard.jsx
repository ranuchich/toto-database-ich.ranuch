import { Link, useNavigate } from 'react-router-dom'    ;
import { useAuth } from './Auth/authContext';
import './Custom.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
const DashboardPage = () => {
  const [ListTask, setListTask] = useState([]);
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const islogout = () => {
        logout();
        navigate("/");
    }

    const ListMyTask = () => {
        const header = {
            headers: {
                'Authorization': 'Bearer ' + user?.token
            }
        }
        axios.get('https://api-todolist.e-khmer.com/api/task', header).then((res) => {
            if (res?.data?.success) {
                console.log("res?.data ==>", res?.data);
                setListTask(res?.data?.datas?.data);
            }
        }).catch((err) => {
            console.log("Error:=>", err);
        });
    }

    useEffect(() => {
            ListMyTask();
    }, []);
    
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="javascript:void(0)">Profile</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="mynavbar">
                        <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                                <a class="nav-link" href="javascript:void(0)">Dashboard</a>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <Link to="/task" class="btn btn-primary">Add</Link>&nbsp;
                            <button onClick={() => islogout()} class="btn btn-info" type="button">Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-4'>
                        <div class="form-check">
                            <input
                                type="radio"
                                class="form-check-input"
                                id="all"
                                name="status"
                                value="0"
                                checked
                            />
                            <label class="form-check-label" for="all"> All </label>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div class="form-check">
                            <input
                                type="radio"
                                class="form-check-input"
                                id="pending"
                                name="status"
                                value="0"
                            />
                            <label class="form-check-label" for="pending"> Pending </label>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div class="form-check">
                            <input
                                type="radio"
                                class="form-check-input"
                                id="completed"
                                name="status"
                                value="0"
                            />
                            <label class="form-check-label" for="completed"> Completed </label>
                        </div>
                    </div>
                </div>
                <table class="table table-striped">
                    <tbody>
                        {ListTask.map((item) => {
                            return (
                                <tr>
                                                                       <td>{item.description}</td>
                                    <td className='text-end'><i class="fa-regular fa-square-check"></i></td> 
                                </tr>
                            )
                        })}
                       
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DashboardPage;