<template>
  <div class="display h-100">
    <b-container fluid=True class="h-100">
      <b-row class="h-100">
        <b-col lg="3" class="tracking-col">
            <b-row>
                <b-col class="tracking-title">
                    Today
                </b-col>
            </b-row>
            <b-row v-for="task in tasks" :key="task.id">
                <b-col v-if="task.status === 'current'" class="task">
                    {{ task.name }}
                </b-col>
                <b-col v-if="task.status === 'complete'" class="task-complete">
                    {{ task.name }}
                </b-col>
                <b-col v-if="task.status === 'future'" class="task-future">
                    {{ task.name }}
                </b-col>
            </b-row>
            <b-row>
                <b-col class="text-center">
                    <b-button v-if="paused === false" v-on:click="pauseCountdown()" variant="text-white" class="pause-momentum-button">Pause</b-button>
                    <b-button v-if="paused === true" v-on:click="pauseCountdown()" variant="text-white" class="pause-momentum-button">Resume</b-button>
                </b-col>
            </b-row>
        </b-col>
        <transition appear name="current-fade">
            <b-col lg="5">
                <b-card class="current-card">
                    <b-card-text v-show="tasksFinished === false" class="h-100">
                        <b-row>
                            <b-col class="text-center">
                                <p>{{ currentTask.name }}<span class="sub-text">in progress</span>
                                </p>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <p class="countdown text-center">{{ displayHours }}<span class="sub-text-time">hrs</span> {{ displayMins }}<span class="sub-text-time">mins</span> {{ displaySecs }}<span class="sub-text-time">secs</span></p>
                                <p class="paused-message" v-if="paused === true">PAUSED</p>
                            </b-col>
                        </b-row>
                    </b-card-text>
                    <b-card-text v-if="tasksFinished === true" class="h-100">
                        <b-row>
                            <b-col class="text-center">
                                <p>Tasks Complete<span class="sub-text">you killed it</span>
                                </p>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class="text-center">
                                <p>Your momentum is unstoppable.</p>
                            </b-col>
                        </b-row>
                    </b-card-text>
                </b-card>
            </b-col>
        </transition>
        <transition appear name="complete-fade">
            <b-col lg="3">
                <b-card class="complete-card">
                    <b-card-text>
                        <b-row>
                            <b-col class="text-center">
                                <p>Completed</p>
                            </b-col>
                        </b-row>
                        <b-row v-for="task in tasks" :key="task.id">
                            <b-col v-show="task.status === 'complete'" class="task text-center">
                                <b-icon class="check" icon="check-2"></b-icon>
                                {{ task.name }}
                            </b-col>
                        </b-row>
                    </b-card-text>
                </b-card>
            </b-col>
        </transition>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Display',
  data() {
        return {
            // tasks: [{"id": 0, "name":"React App", "start":"7:00AM", "finish":"8:00AM", "duration": 5, "status":"current"}, 
            //         {"id": 1, "name":"Algorithm Design", "start":"8:00AM", "finish":"9:00AM", "duration": 5, "status":"future"}, 
            //         {"id": 2, "name":"Algorithm Study", "start":"10:00AM", "finish":"11:00AM", "duration": 5, "status":"future"}, 
            //         {"id": 3, "name":"Lunch", "start":"12:00PM", "finish":"1:00PM", "duration": 5, "status":"future"}, 
            //         {"id": 4, "name":"Meeting Customer", "start":"2:00PM", "finish":"3:00PM", "duration": 5, "status":"future"},
            //         {"id": 5, "name":"Meeting Internal Team", "start":"4:00PM", "finish":"5:00PM", "duration": 5, "status":"future"},
            //         {"id": 6, "name":"Follow Up Emails", "start":"6:00PM", "finish":"7:00PM", "duration": 5, "status":"future"}
            // ], 
            // tasks: this.$route.params.tasks, 
            currentTask: null, 
            displayHours: 0, 
            displayMins: 0, 
            displaySecs: 0, 
            tasksFinished: false, 
            paused: false, 
        } 
    },
    props: {
        tasks: {
            type: Object, 
            required: true
        }
    }, 
    methods: {
        tick() {
            if (this.paused === false) {
                if (this.currentTask.duration === 0) {
                    this.tasks[this.currentTask.id]["status"] = "complete"; 
                    if (this.tasks[this.currentTask.id + 1]) {
                        this.currentTask = (this.tasks.filter((task) => task.id === this.currentTask.id + 1))[0];
                        this.tasks[this.currentTask.id]["status"] = "current"; 
                    } else {
                        this.tasksFinished = true; 
                    }
                }
                this.currentTask.duration = Math.round(this.currentTask.duration - 1);
                let totalSeconds = this.currentTask.duration; 
                this.displayHours = Math.floor(totalSeconds/3600); 
                totalSeconds = totalSeconds %= 3600; 
                this.displayMins = Math.floor(totalSeconds/60); 
                this.displaySecs = totalSeconds % 60;
            } else {
                return; 
            }
        }, 
        pauseCountdown() {
            this.paused = !this.paused; 
        }
    }, 
    mounted() {
        this.tasks[0]['status'] = "current"; 
        this.currentTask = this.tasks[0]; 
        window.setInterval(() => {this.tick();}, 1000); 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.display {
    overflow-y: scroll; 
}
.current-fade-enter-active {
  transition: opacity 6s ease-in;
}
.current-fade-enter-to {
  opacity: 1;
}
.current-fade-enter {
  opacity: 0;
}
.complete-fade-enter-active {
  transition: opacity 15s ease-in;
}
.complete-fade-enter-to {
  opacity: 1;
}
.complete-fade-enter {
  opacity: 0;
}
.paused-message {
    color: red;
    text-align: right;  
}
.pause-momentum-button {
    background-color: white; 
    border-radius: 30px;
    width: 200px;
    height: 60px;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    margin-top: 50px; 
}
.countdown {
    font-size: 80px; 
    font-weight: bold; 
    height: 300px;
    padding-top: 75px; 
}
.check {
    color: green; 
}
.sub-text {
    font-size: 16px; 
    color: grey; 
}
.sub-text-time {
    font-size: 25px; 
    color: grey; 
}
.current-card {
    border: 1px solid black;
    border-radius: 5px;
    height: 515px;
    margin-top: 50px; 
    align-items: middle;
    font-size: 40px;
    margin-left: 50px;   
}
.complete-card {
    border: 1px solid black;
    border-radius: 5px;
    height: 515px;
    margin-top: 50px; 
    align-items: middle;
    font-size: 20px;  
}
.tracking-title {
    text-align: center;
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 20px;  
}
.tracking-col {
    background-color: black; 
    color: white; 
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
    text-align: center;
    white-space: nowrap;
    margin-right: 5px;  
    margin-left: 15px; 
    padding-right: 5px; 
    border: 2px solid white; 
}
.task-complete {
    font-size: 24px;
    margin-bottom: 10px;
    padding: 0px; 
    text-align: center; 
    white-space: nowrap;
    margin-right: 5px;  
    margin-left: 15px; 
    color: grey; 
    text-decoration-line: line-through;
}
.times-complete {
    font-size: 12px; 
    margin: 0px;
    padding: 0px 4px 0px 0px;  
    font-weight: bold;
    text-align: right;
    color: grey;  
}
.task-future {
    font-size: 24px;
    margin-bottom: 10px;
    padding: 0px; 
    text-align: center; 
    white-space: nowrap;
    margin-right: 5px;  
    margin-left: 15px; 
    color: grey;
}
.times-future {
    font-size: 12px; 
    margin: 0px;
    padding: 0px 4px 0px 0px;  
    font-weight: bold;
    text-align: right;
    color: grey;  
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
