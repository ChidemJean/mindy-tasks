
//TODO: create params types

export const apiCreateTask = async (data: any) => { 
   return await window.electron.execute("create/task", data); 
}

export const apiSearchTasks = async (data: any) => {
   return await window.electron.execute("search/task", data);
}

export const apiGetUsers = async () => { 
   return await window.electron.execute("get/users"); 
}