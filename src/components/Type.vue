<template>
  <div id="root">
    <input type="text" value="12" />
    <div class="operator">+</div>
    <input type="text" value="12" />
  </div>
</template>

<script>
export default {
  name: 'Type'
};
</script>

<style scoped>
#root {
  flex-direction: column;
  width: 500px;
  height: 400px;
  padding: 35px;
  display: flex;
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 80px -30px rgba(13, 81, 134, 1);
}

input {
  text-align: center;
  color: #484848;
  background-color: #f4faff;
  border-radius: 5px;
  height: 50px;
}

.operator {
  border-radius: 10px;
  margin: 12px auto;
  display: flex;
  width: 60px;
  height: 60px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: #d9efff;
  color: #3fa9fc;
  cursor: pointer;
}
</style>
