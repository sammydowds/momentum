<template>
  <div class="welcome">
    <b-container fluid="md">
    <!-- <b-row>
        <b-col>
            <b-card class="header-card" title="Welcome">
                <b-card-text>
                    <p>Today is about Focus. Schedule your most complex things early. Limit Distractions. Build and Accomplish.</p>
                </b-card-text>
            </b-card>
        </b-col>
    </b-row> -->
      <b-row align-v="center" class="h-100">
        <b-col>
           <b-card class="today-card" title="Today">
                <b-card-text>
                    <b-row v-for="task in tasks" :key="task.id">
                        <b-col class="times" lg="2">
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
                <p v-if="tasks.length === 0">Schedule some tasks using the form to the right.</p>
                <b-link to="/display">
                    <b-button v-if="tasks.length !== 0" variant="text-black" class="button-momentum">Start</b-button>
                </b-link>
            </b-card>
        </b-col>
        <b-col>
          <b-card class="form-card" title="Add Task">
                <b-card-text>
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                        <b-form-group
                            id="input-group-1"
                            label="Task Name:"
                            label-for="input-live"
                        >
                            <b-form-input
                            id="input-live"
                            v-model="form.name"
                            :state="nameState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter your name"
                            required
                            trim
                            ></b-form-input>

                            <!-- This will only be shown if the preceding input has an invalid state -->
                            <b-form-invalid-feedback id="input-live-feedback">
                            3-20 Characters 
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group id="input-group-2" label="Duration of Task (Minutes):" label-for="input-2">
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
                        <b-button type="submit" variant="text-black" class="button-momentum">Schedule</b-button>
                    </b-form>
                </b-card-text>
            </b-card>
        </b-col>
        <b-col>
          <b-card class="quote-card">
                <b-card-text>
                    <p>Build.</p>
                    <p>Momentum.</p>
                    <p>Unstoppable.</p>
                    <p>Focus.</p>
                </b-card-text>
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
        return this.form.name.length > 2 && this.form.name.length < 20 ? true : false
      }, 
      durationState() {
        return this.form.duration > 0 && this.form.duration <= 120 ? true : false
      }
    },
    data() {
        return {
            form: {
                name: '',
                duration: 0,
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
            let task = {"id": this.id, "name": this.form.name, "duration": this.form.duration, "start": start.format('h:mma'), "finish": finish.format('h:mma')};
            this.tasks.push(task);
            this.id++; 
            this.form.name =''; 
            this.form.duration=0;
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
    border: 1px solid black;
    border-radius: 5px;
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