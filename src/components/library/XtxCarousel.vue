<template>
    <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
        <!-- 图片容器 -->
        <ul class="carousel-body">
            <!-- 正在显示的图片加上fade效果 -->
            <li
                class="carousel-item"
                v-for="(item, index) in sliders"
                :key="index"
                :class="{ fade: index === activeIndex }"
            >
                <RouterLink v-if="item.hrefUrl" :to="item.hrefUrl">
                    <img :src="item.imgUrl" alt="" />
                </RouterLink>
                <div v-else class="slider">
                    <RouterLink
                        v-for="goods in item"
                        :key="goods.id"
                        :to="`/goods/${goods.id}`"
                        class="goods-item"
                    >
                        <img :src="goods.picture" alt="" />
                        <p class="name ellipsis">{{ goods.name }}</p>
                        <p class="price">&yen;{{ goods.price }}</p>
                    </RouterLink>
                </div>
            </li>
        </ul>
        <!-- 上一张 -->
        <a href="javascript:;" class="carousel-btn prev" @click="prev"
            ><i class="iconfont icon-angle-left"></i
        ></a>
        <!-- 下一张 -->
        <a href="javascript:;" class="carousel-btn next" @click="next"
            ><i class="iconfont icon-angle-right"></i
        ></a>
        <!-- 圆圈指示器 -->
        <div class="carousel-indicator">
            <!-- active类表示激活的指示器 -->
            <span
                v-for="(item, index) in sliders"
                :key="index"
                :class="{ active: index === activeIndex }"
                @click="onIndicatorClick(index)"
            ></span>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
    sliders: {
        type: Array,
        default: () => []
    },
    // 是否自动播放
    autoPlay: {
        type: Boolean,
        default: true
    },
    // 播放间隔
    duration: {
        type: Number,
        default: 3000
    }
})
// 正在播放的index
const activeIndex = ref(0)
// 上一张
const prev = () => {
    if (activeIndex.value <= 0) {
        activeIndex.value = props.sliders.length - 1
    } else {
        activeIndex.value--
    }
    console.log(activeIndex.value)
}
// 下一张
const next = () => {
    if (activeIndex.value >= props.sliders.length - 1) {
        activeIndex.value = 0
    } else {
        activeIndex.value++
    }
}
// 点击圆圈指示器
const onIndicatorClick = (index) => {
    activeIndex.value = index
}
// 自动播放
let timer = null
const autoPlayFunction = () => {
    // 防止定时器重复添加
    clearInterval(timer)
    timer = setInterval(() => {
        next()
    }, props.duration)
}
// 鼠标进入暂停,鼠标离开开启自动播放
const stop = () => {
    if (timer) {
        clearInterval(timer)
    }
}
const start = () => {
    if (props.sliders.length && props.autoPlay) {
        autoPlayFunction()
    }
}
// 监听sliders是否被传入数据和是否开启自动播放
watch(
    () => props.sliders,
    () => {
        start()
    },
    { immediate: true }
)
</script>
<style scoped lang="less">
.goods-item {
    .hoverShadow();
}
.xtx-carousel {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    position: relative;
    .carousel {
        &-body {
            width: 100%;
            height: 100%;
        }
        &-item {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            transition: opacity 1s linear;
            &.fade {
                opacity: 1;
                z-index: 1;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
        &-indicator {
            position: absolute;
            left: 0;
            bottom: 20px;
            z-index: 2;
            width: 100%;
            text-align: center;
            span {
                display: inline-block;
                width: 12px;
                height: 12px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 50%;
                cursor: pointer;
                ~ span {
                    margin-left: 12px;
                }
                &.active {
                    background: #fff;
                }
            }
        }
        &-btn {
            width: 44px;
            height: 44px;
            background: rgba(0, 0, 0, 0.5);
            color: #fff;
            border-radius: 50%;
            position: absolute;
            top: 228px;
            z-index: 2;
            text-align: center;
            line-height: 44px;
            opacity: 0;
            transition: all 0.5s;
            &.prev {
                left: 20px;
            }
            &.next {
                right: 20px;
            }
        }
    }
    &:hover {
        .carousel-btn {
            opacity: 1;
        }
    }
}
// 轮播商品
.slider {
    display: flex;
    justify-content: space-around;
    padding: 0 40px;
    > a {
        width: 240px;
        text-align: center;
        img {
            padding: 20px;
            width: 230px !important;
            height: 230px !important;
        }
        .name {
            font-size: 16px;
            color: #666;
            padding: 0 40px;
        }
        .price {
            font-size: 16px;
            color: @priceColor;
            margin-top: 15px;
        }
    }
}
</style>
