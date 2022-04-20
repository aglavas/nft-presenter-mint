<template>
  <div id="app">
    <div class="container">
      <h1 class="title">Super Mario World Collection</h1>
      <h4 class="subtitle">Super Mario World Collection</h4>
      <div class="grid">
        <NFTCard
          v-for="(nftData, index) in nfts"
          :nft="nftData"
          :key="index"
          :id="index"
          :toggle="toggleModal"
        ></NFTCard>
      </div>
    </div>
    <NFTModal
      v-if="showModal"
      :nft=this.selectedNft
      :toggle=this.toggleModal
    ></NFTModal>
  </div>
</template>

<script>
import NFTCard from './components/NFTCard.vue'
import NFTModal from './components/NFTModal.vue'
import { ref } from 'vue';
import { ethers } from 'ethers';
import { connect } from './helpers';
const axios = require('axios');

export default {
  name: 'App',
  components: {
    NFTCard,
    NFTModal
  },
  setup() {
    const NFTfallback = [
        { name: "Mario", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Luigi", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Yoshi", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Donkey Kong", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Mario", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Luigi", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Yoshi", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Donkey Kong", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
      ];

    const showModal = ref(false);
    const setShowModal = (newState) => {
      showModal.value = newState;
    };

    const selectedNft = ref(0);
    const setSelectedNft = (newState) => {
      selectedNft.value = newState;
    };

    const nfts = ref(NFTfallback);
    const setNfts = (newState) => {
      nfts.value = newState;
    };

    return {
      showModal,
      setShowModal,
      selectedNft,
      setSelectedNft,
      nfts,
      setNfts
    };
  },
  data() {
    return {
      initialNFTs: [
        { name: "Mario", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Luigi", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Yoshi", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Donkey Kong", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Mario", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Luigi", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Yoshi", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
        { name: "Donkey Kong", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
      ]
    }
  },
  mounted() {
    this.connectMetamask();
  },
  updated() {
    //this.connectMetamask();
  },
  methods: {
    toggleModal(i) {
      if (i >= 0) {
        this.setSelectedNft(this.nfts[i]);
      }
      this.setShowModal(!this.showModal);
    },
    async connectMetamask() {
      const address = await connect();
      if (address) {
        this.getNfts(address);
      }
    },
    async getMetadataFromIpfs(tokenURI) {
      let metadata = await axios.get(tokenURI)
      return metadata.data
    },
    async getNfts(address) {
      const rpc = "https://rpc-mumbai.maticvigil.com/" // Alchemy 
      const ethersProvider = new ethers.providers.JsonRpcProvider(rpc)

      let abi = [
        "function symbol() public view returns(string memory)",
        "function tokenCount() public view returns(uint256)",
        "function uri(uint256 _tokenId) public view returns(string memory)",
        "function balanceOfBatch(address[] accounts, uint256[] ids) public view returns(uint256[])"
      ]

      let nftCollection = new ethers.Contract(
        "0xbd74430c3f17154f68b67c00062568b0c004f791",
        abi,
        ethersProvider
      )

      let numberOfNfts = (await nftCollection.tokenCount()).toNumber()
      let collectionSymbol = await nftCollection.symbol()

      let accounts = Array(numberOfNfts).fill(address)
      let ids = Array.from({length: numberOfNfts}, (_, i) => i + 1)
      let copies = await nftCollection.balanceOfBatch(accounts, ids)

      let tempArray = []
      let baseUrl = ""

      for (let i = 1; i <= numberOfNfts; i++) {
        if (i == 1) { 
          let tokenURI = await nftCollection.uri(i)
          baseUrl = tokenURI.replace(/\d+.json/, "")
          let metadata = await this.getMetadataFromIpfs(tokenURI)
          metadata.symbol = collectionSymbol
          metadata.copies = copies[i - 1]
          tempArray.push(metadata)
        } else {
          let metadata = await this.getMetadataFromIpfs(baseUrl + `${i}.json`)
          metadata.symbol = collectionSymbol
          metadata.copies = copies[i - 1]
          tempArray.push(metadata)
        }
      }
      this.setNfts(tempArray)
    } 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
