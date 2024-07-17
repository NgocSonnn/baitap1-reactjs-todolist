import axios from "axios";

export const TaskApi = {
    getAllTasks: async (params) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BE_URL}tasks`, {
                params: {
                    _sort: "createAt",
                    _order: "desc",
                    ...params,
                }
            })
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    createTask: async (task) => {
        try {
            await axios.post(`${process.env.REACT_APP_BE_URL}tasks`, task)
        } catch (error) {
            console.log(error);
        }
    },
    removeTaskById: async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BE_URL}tasks/${id}`)
        } catch (error) {
            console.log(error);
        }
    },
    makeDoneTaskById: async (id, payload) => {
        try {
            await axios.patch(`${process.env.REACT_APP_BE_URL}tasks/${id}`, payload)
        } catch (error) {
            console.log(error);
        }

    }
}
