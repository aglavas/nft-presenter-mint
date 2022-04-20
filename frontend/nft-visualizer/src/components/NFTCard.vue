<template>
  <div @click="toggle(id)" v-if="show" class="card">
    <div class="photo" :style="{backgroundImage:`url(${nft.image})`}"></div>
    <div style="margin-top: 5px;">
      <div class="name-wrapper">
        <div class="collection-text">
          {{ this.nft.symbol}}
        </div>
        <div class="name">
          {{ this.nft.name}}
        </div>
      </div>
        <div class="name copy-count-wrapper">
          X{{ this.nft.copies}}
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'NFTCard',
  props: {
    nft: Object,
    toggle: Function,
    id: Number
  },
  data() {
    return {
      show: false
    }
  },
  mounted() {
    if (this.nft) {
      this.show = true;
    }
  }
}
</script>