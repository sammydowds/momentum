<template>
  <div class="welcome">
    <b-container class="bv-example-row">
      <b-row>
        <b-col class="text-center">
            <transition appear name="fade">
              <p class="main-message">Momentum</p>
            </transition>
            <transition appear name="fade2">
              <p class="text-bottom">Focus on Today</p>
            </transition>
            <b-link to="/setup">
              <b-button variant="text-black" class="button-momentum">Build</b-button>
            </b-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active {
  transition: opacity 1s ease-in;
}
.fade-enter-to {
  opacity: 1;
}

.fade-enter {
  opacity: 0;
}
.fade2-enter-active {
  transition: opacity 4s ease-in;
}
.fade2-enter-to {
  opacity: 1;
}

.fade2-enter {
  opacity: 0;
}
.welcome {
  font-style: Roboto;
  color: black; 
  position: absolute;
  width: 682px;
  height: 207px;
  left: calc(50% - 682px/2);
  top: calc(50% - 207px/2 - 13.5px); 
}

.main-message {
  font-style: normal;
  font-weight: normal;
  font-size: 96px;
  line-height: 112px;
  text-align: center;
  margin: 0px; 
}

.top-text {
  position: absolute;
  width: 287px;
  height: 45px;
  left: 539px;
  top: 267px;
  margin: 0px; 
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;
}

.top-bottom {
  position: absolute;
  width: 682px;
  height: 207px;
  left: 539px;
  top: 267px;
  margin: 0px; 
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;
}

.button-momentum {
  border-radius: 30px;
  width: 244px;
  height: 65px;
  left: 561px;
  top: 430px;
  font-size: 24px; 
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
