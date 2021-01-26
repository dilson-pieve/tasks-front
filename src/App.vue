<template>
  <div id="app">

   <nav>
      <div class="nav-wrapper black">
        <a href="#" class="brand-logo center"><i class="material-icons">check</i>Tasks - Pieve</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><a href="http://localhost:8080/swagger-ui.html"><i class="material-icons">info</i></a></li>
        </ul>
      </div>
    </nav>

    <div class="container">

      <div id="taskTitle">
        <h5>My daily to-dos</h5>
      </div>

      <form @submit.prevent="saveTask">

          <label><b>Description</b></label>
          <input id="descriptionInput" type="text" placeholder="Description" v-model="task.description">
          <label><b>Duration</b></label>
          <input id="durationInput" type="number" placeholder="Duration" v-model="task.duration">
        
          <button class="waves-effect waves-light btn-small">Save<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>Description</th>
            <th>Duration</th>
            <th>Options</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="task of tasks" :key="task.id">

            <td>{{ task.description }}</td>
            <td>{{ task.duration }}</td>
            <td>
              <button @click="editTask(task)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="deleteTask(task)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>


<script>

import Task from './services/tasks'
  
  export default {

    data() {
      return {
        task: {
          id:'',
          description:'',
          duration:'',
        },
        tasks: [],
      }
    },
  
    mounted() { this.listTasks() },

    methods: {

      listTasks() {
        Task.listTasks().then( answer => {
          this.tasks = answer.data
        }) 
      },

      saveTask() {
        if (!this.task.id) {
          Task.saveTask(this.task).then(answer => {
            alert('SAVED')
            this.task = {}
            this.listTasks()
            answer
          })
        }
        else {
          Task.updateTask(this.task).then(answer => {
            alert('UPDATED')
            this.task = {}
            this.listTasks()
            answer
          })
        }
      },

      editTask(task) {
        this.task = task
      },

      deleteTask(task) {
        if (confirm("Are you sure you want to delete?")) {
          Task.deleteTask(task).then(answer => {
            this.listTasks()
            answer
          })
        }
      }
    }
  }
</script>

<style>
 #descriptionInput, #durationInput{
    border: 1px solid silver;
    border-radius: 5px;
    box-shadow: 1.3px 1.3px;
    padding-left: 7px;
  }

  #taskTitle {
    margin-bottom: 30px;
    margin-top: 30px;
  }
</style>
