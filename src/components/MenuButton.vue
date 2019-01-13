<template>
  <div class="MenuButtonContainer" :style="mainButtonStyle" @click.stop="toggleShow">
    <span>
      <slot></slot>
    </span>
    <transition name="el-zoom-in-top">
      <span class="menu-body" :class="menuPosition" v-if="menuShow">
        <div v-for="(item, index) in menuItems" :key="index">
          <div v-if="!item.separator" class="menu-item" @click="itemClick(index)">
            <span v-if="thisShowIcon" class="prefix" v-html="item.prefix"></span>
            <span class="content">{{item.textlabel}}</span>
          </div>
          <div v-if="item.separator" class="separator">
            <div class="separator-inner separator-inner-upper"></div>
            <div class="separator-inner"></div>
          </div>
        </div>
      </span>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Mixins,
  Prop,
  Emit
} from 'vue-property-decorator'
import GlobalProperties from '@/mixins/globalproperties'
import MenuButtonItem from '@/types/MenuButtonItem'

@Component({
  mixins: [GlobalProperties]
})
export default class HeaderBar extends Vue {
  @Prop({ default: 'bottom' }) private menuPosition?: string
  @Prop({ default: [] }) private menuItems?: MenuButtonItem[]
  @Prop({ default: '#409EFF' }) private activeColor?: string
  @Prop({ default: true }) private showIcon?: boolean
  private menuShow = false
  get mainButtonStyle() {
    if (this.menuShow) {
      return 'background-color:' + this.activeColor
    } else {
      return ''
    }
  }
  get thisShowIcon() {
    if (this.menuItems) {
      let allEmpty = true
      for (let i = 0; i < this.menuItems.length; i++) {
        if (this.menuItems[i].prefix !== '') {
          allEmpty = false
          break
        }
      }
      if (allEmpty) {
        console.log(allEmpty)
        return false
      }
    }
    return this.showIcon
  }
  private handlerOtherClick() {
    if (this.menuShow) {
      this.menuShow = false
    }
  }
  @Emit()
  private itemClick(e: number) {
    return e
  }
  private toggleShow() {
    this.menuShow = !this.menuShow
  }
  private mounted() {
    document.addEventListener('click', this.handlerOtherClick)
  }
  private destroyed() {
    document.removeEventListener('click', this.handlerOtherClick)
  }
}
</script>

<style scoped>
@import '../assets/fontawesome/css/all.min.css';

.MenuButtonContainer {
  position: relative;
  background-color: #fbfbfc;
  color: #1f1f21;
  cursor: pointer;
}
.MenuButtonContainer:hover {
  background-color: #409EFF;
}
.menu-body {
  border: 1px solid #efefef;
  position: absolute;
  color: #1f1f21;
  box-shadow: rgba(0, 0, 0, 0.4) 0 1px 5px 0;
}
.menu-item {
  height: 40px;
  white-space: nowrap;
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.menu-item:hover {
  background-color: #e0e0e0;
}
.prefix {
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  flex: 1;
  margin-left: 5px;
}
.separator {
  height: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.separator-inner {
  flex: 1;
}
.separator-inner-upper {
  border-bottom: 1px solid gray;
  width: 90%;
}
.bottom {
  top: 105%;
}
.bottom-left {
  top: 105%;
  right: 0;
}
.bottom-right {
  top: 105%;
  left: 0;
}
.top {
  bottom: 105%;
}
.top-left {
  bottom: 105%;
  right: 0;
}
.top-right {
  bottom: 105%;
  left: 0;
}
</style>
