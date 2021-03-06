<template>
  <div class="calculator">
    <div class="answer">{{ displayAnswer }}</div>
    <div class="display" :value="this.logList + this.current">
      {{ logList + current }}
    </div>
    <div @click="clear" id="clear" class="btn operator">C</div>
    <div @click="percent" id="percent" class="btn operator">
      %
    </div>
    <div @click="divide" id="divide" class="btn operator">
      /
    </div>
    <div @click="backspace" id="backspace" class="btn operator">↼</div>
    <div @click="append('7')" id="n7" class="btn">7</div>
    <div @click="append('8')" id="n8" class="btn">8</div>
    <div @click="append('9')" id="n9" class="btn">9</div>
    <div @click="times" id="times" class="btn operator">*</div>
    <div @click="append('4')" id="n4" class="btn">4</div>
    <div @click="append('5')" id="n5" class="btn">5</div>
    <div @click="append('6')" id="n6" class="btn">6</div>
    <div @click="minus" id="minus" class="btn operator">-</div>
    <div @click="append('1')" id="n1" class="btn">1</div>
    <div @click="append('2')" id="n2" class="btn">2</div>
    <div @click="append('3')" id="n3" class="btn">3</div>
    <div @click="plus" id="plus" class="btn operator">+</div>
    <div @click="copy" id="copy" class="btn operator">&#x2398;</div>
    <div @click="append('0')" id="n0" class="zero">0</div>
    <div @click="dot" id="dot" class="btn">.</div>
    <div @click="equal" id="equal" class="btn operator">=</div>
  </div>
</template>

<script>
import { reduceNumberWithDot, deleteExponential, Toast } from '@/utils';
import anime from 'animejs';
import { evaluate } from 'mathjs';

export default {
  name: 'Calc',
  data() {
    return {
      logList: '',
      current: '',
      answer: '',
      operatorClicked: true
    };
  },
  computed: {
    displayAnswer() {
      return reduceNumberWithDot(String(this.answer), 10);
    }
  },
  methods: {
    backspace() {
      if (this.operatorClicked) {
        this.logList = this.logList.slice(0, -3);
        this.operatorClicked = false;
        return;
      }
      this.current = this.current.slice(0, -1);
      this.operatorClicked = false;
    },
    append(number) {
      if (this.operatorClicked) {
        this.current = '';
        this.operatorClicked = false;
      }
      this.animateNumber(`n${number}`);
      this.current = `${this.current}${number}`;
    },
    addtoLog(operator) {
      if (!this.operatorClicked) {
        this.logList += `${this.current} ${operator} `;
        this.current = '';
        this.operatorClicked = true;
      }
    },
    animateNumber(number) {
      const tl = anime.timeline({
        targets: `#${number}`,
        duration: 250,
        easing: 'easeInOutCubic'
      });
      tl.add({ backgroundColor: '#c1e3ff' });
      tl.add({ backgroundColor: '#f4faff' });
    },
    animateOperator(operator) {
      const tl = anime.timeline({
        targets: `#${operator}`,
        duration: 250,
        easing: 'easeInOutCubic'
      });
      tl.add({ backgroundColor: '#a6daff' });
      tl.add({ backgroundColor: '#d9efff' });
    },
    clear() {
      this.animateOperator('clear');
      this.current = '';
      this.answer = '';
      this.logList = '';
      this.operatorClicked = false;
    },
    copy() {
      this.animateOperator('copy');

      if (!this.answer) {
        return;
      }

      const temp = document.createElement('input');
      temp.value = this.answer;
      temp.style = 'position: absolute; left: -1000px; top: -1000px';
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      const toast = Toast('Copied!', 1000);
      toast.showToast();
    },
    percent() {
      this.animateOperator('percent');
      if (this.current != '') {
        this.current = `${parseFloat(this.current) / 100}`;
      }
    },
    dot() {
      this.animateNumber('dot');
      if (this.current.indexOf('.') === -1) {
        this.append('.');
      }
    },
    divide() {
      this.animateOperator('divide');
      this.addtoLog('/');
    },
    times() {
      this.animateOperator('times');
      this.addtoLog('*');
    },
    minus() {
      this.animateOperator('minus');
      this.addtoLog('-');
    },
    plus() {
      this.animateOperator('plus');
      this.addtoLog('+');
    },
    equal() {
      this.animateOperator('equal');
      if (!this.operatorClicked) {
        const answer = evaluate(this.logList + this.current);
        this.answer = deleteExponential(answer);
        return;
      }
      this.answer = 'Error';
    },
    selectOperation(operator) {
      switch (operator) {
        case '+':
          this.plus();
          break;
        case '-':
          this.minus();
          break;
        case '*':
          this.times();
          break;
        case '/':
          this.divide();
          break;
        case '%':
          this.percent();
          break;
        case 'Enter':
        case '=':
          this.equal();
          break;
        default:
          break;
      }
    },
    keyEventListener(e) {
      const key = e.key;
      const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
      const operators = ['+', '-', '*', '/', '%', '=', 'Enter'];
      if (numbers.includes(key)) this.append(key);
      else if (operators.includes(key)) this.selectOperation(key);
      else {
        switch (key) {
          case '.':
            this.dot();
            break;
          case 'Backspace':
            this.backspace();
            break;
          default:
            break;
        }
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.keyEventListener);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyEventListener);
  }
};
</script>

<style scoped>
::selection {
  background: none;
}

.calculator {
  display: grid;
  grid-template-rows: repeat(7, minmax(60px, auto));
  grid-template-columns: repeat(4, 60px);
  grid-gap: 12px;
  padding: 35px;
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 80px -30px rgba(13, 81, 134, 1);
}

.btn,
.zero {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #484848;
  background-color: #f4faff;
  border-radius: 5px;
}

.display,
.answer {
  grid-column: 1 / 5;
  display: flex;
  align-items: center;
}

.display {
  color: #a3a3a3;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: clip;
}

.answer {
  font-weight: 500;
  color: #146080;
  font-size: 40px;
  height: 65px;
  line-height: 50px;
}

.operator {
  background-color: #d9efff;
  color: #3fa9fc;
}
</style>
