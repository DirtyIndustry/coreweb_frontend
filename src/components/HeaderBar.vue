<template>
    <div>顶栏</div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop, Emit, Watch } from 'vue-property-decorator'
import GlobalProperties from '@/mixins/globalproperties'

@Component({
    mixins: [GlobalProperties]
})
export default class HeaderBar extends Vue {

}
</script>

<style scoped>
</style>
