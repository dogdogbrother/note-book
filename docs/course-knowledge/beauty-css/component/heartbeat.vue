<template>
  <div class="heart-loading">
    <ul style="--line-count: 9;">
      <li class="line-1" style="--line-index: 1;"></li>
      <li class="line-2" style="--line-index: 2;"></li>
      <li class="line-3" style="--line-index: 3;"></li>
      <li class="line-4" style="--line-index: 4;"></li>
      <li class="line-5" style="--line-index: 5;"></li>
      <li class="line-6" style="--line-index: 6;"></li>
      <li class="line-7" style="--line-index: 7;"></li>
      <li class="line-8" style="--line-index: 8;"></li>
      <li class="line-9" style="--line-index: 9;"></li>
    </ul>
  </div>
</template>
<style lang='stylus' scoped>
.heart-loading
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;

ul
  display: flex;
  justify-content: space-between;
  width: 150px;
  height: 10px;
  list-style: none;

li
  --angle: calc(var(--line-index) / var(--line-count) * .5turn);
  --time: calc((var(--line-index) - 1) * 40ms);
  border-radius: 5px;
  width: 10px;
  height: 10px;
  background-color: #3c9;
  filter: hue-rotate(var(--angle));
  animation-duration: 1.5s;
  animation-delay: var(--time);
  animation-iteration-count: infinite;
  &.line-1,&.line-9 
    animation-name: beat-1;
  &.line-2,&.line-8 
    animation-name: beat-2;
  &.line-3,&.line-7 
    animation-name: beat-3;
  &.line-4,&.line-6 
    animation-name: beat-4;
  &.line-5
    animation-name: beat-5;
@keyframes beat-1
  0%,10%,90%,100% 
    height: 10px;
  45%,55%
    height: 30px;
    transform: translate3d(0, -15px, 0);

@keyframes beat-2
  0%,10%,90%,100% 
    height: 10px;
  45%,55%
    height: 60px;
    transform: translate3d(0, -30px, 0);

@keyframes beat-3
  0%,10%,90%,100% 
    height: 10px;
  45%,55%
    height: 80px;
    transform: translate3d(0, -40px, 0);

@keyframes beat-4
  0%,10%,90%,100% 
    height: 10px;
  45%,55%
    height: 90px;
    transform: translate3d(0, -30px, 0);

@keyframes beat-5
  0%,10%,90%,100% 
    height: 10px;
  45%,55%
    height: 90px;
    transform: translate3d(0, -20px, 0);
</style>