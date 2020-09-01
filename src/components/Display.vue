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
                <b-col v-if="task.status === 'current'" class="times" lg="3">
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
                <b-col v-if="task.status === 'current'" class="task">
                    {{ task.name }}
                </b-col>
                 <b-col v-if="task.status === 'complete'" class="times-complete" lg="3">
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
                <b-col v-if="task.status === 'complete'" class="task-complete">
                    {{ task.name }}
                </b-col>
                <b-col v-if="task.status === 'future'" class="times-future" lg="3">
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
                <b-col v-if="task.status === 'future'" class="task-future">
                    {{ task.name }}
                </b-col>
            </b-row>
        </b-col>
        <b-col lg="5">
            <b-card class="current-card">
                <b-card-text>
                    <p>Build.</p>
                    <p>Momentum.</p>
                    <p>Unstoppable.</p>
                    <p>Focus.</p>
                </b-card-text>
            </b-card>
        </b-col>
        <b-col lg="3">
            <b-card class="current-card">
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
export default {
  name: 'Display',
  data() {
        return {
            tasks: [{"name":"React App", "start":"7:00AM", "finish":"8:00AM", "status":"complete"}, 
                    {"name":"Algorithm Design", "start":"8:00AM", "finish":"9:00AM", "status":"complete"}, 
                    {"name":"Algorithm Study", "start":"10:00AM", "finish":"11:00AM", "status":"complete"}, 
                    {"name":"Lunch", "start":"12:00PM", "finish":"1:00PM", "status":"complete"}, 
                    {"name":"Meeting Customer", "start":"2:00PM", "finish":"3:00PM", "status":"current"},
                    {"name":"Meeting Internal Team", "start":"4:00PM", "finish":"5:00PM", "status":"future"},
                    {"name":"Follow Up Emails", "start":"6:00PM", "finish":"7:00PM", "status":"future"}
                    ]
        } 
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.current-card {
    border: 1px solid black;
    border-radius: 5px;
    height: 515px;
    margin-top: 50px; 
    align-items: middle;
    font-size: 48px;
    margin-left: 50px;   
}
.complete-card {
    border: 1px solid black;
    border-radius: 5px;
    height: 515px;
    margin-top: 50px; 
    align-items: middle;
    font-size: 48px;  
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
    text-align: left; 
    white-space: nowrap;
    margin-right: 5px;  
    padding-left: 5px; 
    border: 2px solid white; 
}
.task-complete {
    font-size: 24px;
    margin-bottom: 10px;
    padding: 0px; 
    text-align: left; 
    white-space: nowrap;
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
    text-align: left; 
    white-space: nowrap;
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
