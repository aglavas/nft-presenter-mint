<template>
  <div class="progress-bar-outer">
    <div class="progress-bar-inner" :style="{width: `${percent}%`}">
    </div>
  </div>
</template>

<script>

export default {
  name: 'NFTProgressBar',
  props: {
    percent: Number
  }
}
</script>