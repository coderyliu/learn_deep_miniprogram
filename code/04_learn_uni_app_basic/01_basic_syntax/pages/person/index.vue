<template>
	<view class="person-wrap"></view>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import useMainStore from '@/store/main.js';

//使用pinia
const mainStore = useMainStore();
const { userInfo } = storeToRefs(mainStore);
</script>

<style lang='scss'></style>
