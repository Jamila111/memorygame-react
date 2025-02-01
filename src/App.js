import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import KanbanBoard from './components/KanbanBoard';

function App() {
    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([]);


    const createTasks = async (taskData) => {
        try {

            console.log('Sending task data:', taskData);

            const response = await axios.post('https://expressjs-server.vercel.app/tasks', {
                name: taskData.name,
                description: taskData.description,
                status: taskData.status,
                priority: Number(taskData.priority)
            });


            console.log('Server response:', response);

            if (response.data) {
                getTasks();
                return response.data;
            } else {
                throw new Error('No data received from server');
            }
        } catch (error) {
            console.error('Detailed error:', {
                message: error.message,
                response: error.response,
                status: error.response?.status,
                data: error.response?.data
            });
            throw error;
        }
    };

    const getStatuses = () => {
        axios.get('https://expressjs-server.vercel.app/statuses')
            .then((response) => {
                setStatuses(response.data);
            })
            .catch((error) => {
                console.error('Error');
            });
    };

    const getTasks = () => {
        axios.get('https://expressjs-server.vercel.app/tasks')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('Error');
            });
    };

    const moveTask = async (id, newStatus) => {
        try {
            await axios.patch(`https://expressjs-server.vercel.app/tasks/${id}`, {
                status: newStatus
            });
            getTasks();
        } catch (error) {
            console.error('Error');
        }
    };

    const updateTask = async (id, updatedData) => {
        try {
            await axios.patch(`https://expressjs-server.vercel.app/tasks/${id}`, updatedData);
            getTasks();
        } catch (error) {
            console.error('Error');
        }
    }

    const deleteTask = async (id) => {
        try {
            await axios.delete(`https://expressjs-server.vercel.app/tasks/${id}`);
            getTasks();
        } catch (error) {
            console.error('Error');
        }
    };



    useEffect(() => {
        getStatuses();
        getTasks();
    }, []);

    return (
        <KanbanBoard
            statuses={statuses}
            tasks={tasks}
            onMoveTask={moveTask}
            onDeleteTask={deleteTask}
            onUpdateTask={updateTask}
            onCreateTask={createTasks}
        />
    );
}

export default App;
