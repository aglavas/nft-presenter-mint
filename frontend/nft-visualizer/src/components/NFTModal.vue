<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-grid">
        <div class="photo modal-photo-dimensions" :style="{backgroundImage:`url(${nft.image})`}"></div>
        <div>
          <h1 class="modal-title">
            {{ nft.name }}
          </h1>
          <div class="modal-paragraph">
            You own {{ nft.copies }} copies
          </div>
          <h3 class="modal-section">
            Description
          </h3>
          <div class="modal-paragraph" style="width: 400">
            {{ nft.description }}
          </div>
          <h3 class="modal-section">
            Attributes
          </h3>
          <div v-if="nft.attributes">
            <div v-for="(attribute, index) in nft.attributes" :key="index">
              <div class="attribute-wrapper">
                <h4 class="modal-text"> {{ attribute.trait_type }} </h4>
                <h4 class="modal-text" style="float: right;"> {{ attribute.value }} </h4>
              </div>
              <NFTProgressBar :percent="attribute.value * 10"></NFTProgressBar>
            </div>
          </div>
        </div>
      </div>
      <span @click="toggle" class="modal-close-button">
        &times;
      </span>
    </div>
  </div>
</template>

<script>
import NFTProgressBar from './NFTProgressBar.vue'

export default {
  name: 'NFTModal',
  components: {
    NFTProgressBar
  },
  props: {
    nft: Object,
    toggle: Function
  },
  data() {
    return {
      
    }
  },
  mounted() {
    
  }
}
</script>