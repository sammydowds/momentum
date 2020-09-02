<template>
  <div class="welcome">
    <b-container fluid="md">
      <b-row align-v="center" class="h-100 text-center">
        <b-col>
          <b-card class="quote-card">
                <b-card-text>
                    <transition appear name="quote-1-fade">
                        <p>Build.</p>
                    </transition>
                    <transition name="quote-2-fade">
                        <p class="momentum-word">Momentum.</p>
                    </transition>
                    <transition appear name="quote-3-fade">
                        <p>Unstoppable.</p>
                    </transition>
                    <transition appear name="quote-4-fade">
                        <p>Focus.</p>
                    </transition>
                </b-card-text>
            </b-card>
        </b-col>
        <b-col>
            <b-card class="form-card" title="Build Today's Schedule">
                    <b-card-text>
                        <b-form class="task-form" @submit="onSubmit" @reset="onReset" v-if="show">
                            <b-form-group
                                id="input-group-1"
                            >
                                <b-form-input
                                id="input-live"
                                v-model="form.name"
                                :state="nameState"
                                aria-describedby="input-live-help input-live-feedback"
                                placeholder="Name of new task"
                                required
                                trim
                                ></b-form-input>

                                <!-- This will only be shown if the preceding input has an invalid state -->
                                <b-form-invalid-feedback id="input-live-feedback">
                                3-15 Characters 
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group id="input-group-2">
                                <b-form-input
                                id="input-2"
                                v-model="form.duration"
                                :state="durationState"
                                aria-describedby="input-live-help input-live-feedback-2"
                                type="number"
                                required
                                placeholder="Duration in Minutes"
                                trim
                                ></b-form-input>

                                <b-form-invalid-feedback id="input-live-feedback-2">
                                1min to 120mins 
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-button type="submit" variant="text-black" class="button-momentum">
                                Add
                                <b-icon icon="arrow-right"></b-icon>
                            </b-button>
                        </b-form>
                    </b-card-text>
                </b-card>
            </b-col>
        <b-col>
            <b-card class="today-card" title="Today's Agenda">
                <b-card-text>
                    <b-row v-for="task in tasks" :key="task.id">
                        <b-col class="times" lg="3">
                            <b-row>
                                <b-col>
                                    {{ task.start }}
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    {{ task.finish }}
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col class="task">
                            {{ task.name }}
                            <b-button class="del-button" v-on:click="deleteTask(task.id)" size="sm" pill variant="outline-danger">Delete</b-button>
                        </b-col>
                    </b-row>
                </b-card-text>
                <p v-if="tasks.length === 0">
                    <b-icon icon="arrow-left"></b-icon>
                    Enter Tasks
                </p>
                <b-nav-item :to="{
                        name: 'Display',  
                        params: {tasks: tasks}
                        }">
                    <b-button v-if="tasks.length !== 0" variant="text-black" class="button-momentum">Start</b-button>
                </b-nav-item>
            </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'SetUp',
    computed: {
      nameState() {
        return this.form.name.length > 2 && this.form.name.length < 15 ? true : false
      }, 
      durationState() {
        return this.form.duration > 0 && this.form.duration <= 120 ? true : false
      }
    },
    data() {
        return {
            form: {
                name: '',
                duration: null,
            },
            show: true, 
            tasks: [], 
            id: 0, 
            nextStart: moment()
        } 
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            var start = moment(this.nextStart); 
            let finish = this.nextStart.add(this.form.duration, "Minutes");   
            let task = {"id": this.id, "name": this.form.name, "duration": this.form.duration*60, "start": start.format('h:mma'), "finish": finish.format('h:mma'), "status":"future"};
            this.tasks.push(task);
            this.id++; 
            this.form.name =''; 
            this.form.duration=null;
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.name = ''
            this.form.duration = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }, 
        deleteTask(id) {
            this.tasks = this.tasks.filter((task) => task.id !== id); 
            if (this.tasks.length === 0) {
                this.id = 0; 
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task-form {
    padding-top: 35px; 
}
.momentum-word {
    text-decoration: underline;
    font-size: 55px; 
}
.quote-1-fade-enter-active {
  transition: opacity 0.5s ease-in;
}
.quote-1-fade-enter-to {
  opacity: 1;
}
.quote-1-fade-enter {
  opacity: 0;
}
.quote-2-fade-enter-active {
  transition: opacity 12s ease-in;
}
.quote-2-fade-enter-to {
  opacity: 1;
}
.quote-2-fade-enter {
  opacity: 0;
}
.quote-3-fade-enter-active {
  transition: opacity 1s ease-in;
}
.quote-3-fade-enter-to {
  opacity: 1;
}
.quote-3-fade-enter {
  opacity: 0;
}
.quote-4-fade-enter-active {
  transition: opacity 2s ease-in;
}
.quote-4-fade-enter-to {
  opacity: 1;
}
.quote-4-fade-enter {
  opacity: 0;
}
.header-card {
    border: 1px solid black;
    border-radius: 5px;
    height: 100px;
    margin-bottom: 35px;
}
.times {
    font-size: 12px; 
    margin: 0px;
    padding: 0px 4px 0px 0px;  
    font-weight: bold;
    text-align: right; 
}
.task {
    font-size: 24px;
    margin-bottom: 10px;
    padding: 0px; 
    text-align: left; 
    white-space: nowrap;
}
.del-button {
    font-size: 8px;
    margin:0px;
}
.today-card {
    border: 1px solid black;
    border-radius: 5px;
    height: 515px;
    margin-top: 50px;  

}
.form-card {
    border: 1px solid black;
    border-radius: 5px;
    height: 515px;
    margin-top: 50px;  

}
.quote-card {
    border: none; 
    height: 515px;
    align-items: middle;
    font-size: 48px; 
    margin-top: 50px;  
}
.button-momentum {
    border-radius: 30px;
    width: 154px;
    height: 42px;
    font-size: 18px;
    font-style: normal;
    font-weight: 300;
    background: #C4C4C4;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>