<script setup lang="ts">
import type { Part } from '@/models/Parts';
import { BASE_URL } from '@/services/services.config';
import { type Ref, ref } from 'vue';

type PropType = {
    parts: Array<Part>;
    position: "left"|"right"|"center"|"top"|"bottom"
}

const props = defineProps<PropType>();

const selectedIndex = ref(0);

const changePart = (isNext: boolean)=>{

    const newIndex = isNext? selectedIndex.value + 1 : 
                             selectedIndex.value - 1;
    
    //se já estiver na primeira peça, volta para a última
    if(newIndex < 0){
        selectedIndex.value = (props.parts.length - 1);
    }
    //se já estiver na última peça, volta para a primeira
    else if(newIndex > (props.parts.length - 1)){
        selectedIndex.value = 0;
    }
    //não está no limite inferior nem no superior
    else{
        selectedIndex.value = newIndex;
    }
    
    /*if(isNext){
        selectedIndex.value = 
        selectedIndex.value >= (props.parts.length - 1)?
        (props.parts.length - 1) : selectedIndex.value + 1;
    }
    else{
        selectedIndex.value = selectedIndex.value <= 0?
        0 : selectedIndex.value - 1;
    }*/
}
</script>
<template>
    <div :class="`part ${props.parts}`">          
        <img :src="BASE_URL + props.parts[selectedIndex].src" alt="">
        <button @click="changePart(false)" class="prev-selector"></button>
        <button @click="changePart(true)" class="next-selector"></button>
    </div>
</template>

<style scoped lang="scss">
$part-width: 165px;
$part-height: 165px;

.part{
    position: relative;
    width: $part-width;
    height: $part-height;
    border: 3px solid #aaa;

    img{
        width: calc($part-width - 5px);
        height: calc($part-height - 5px);
    }
}

</style>