<template>
    <button class="xtx-button ellipsis" :class="[size, type]">
        <slot />
    </button>
</template>
<script setup>
defineProps({
    size: {
        type: String,
        default: 'middle',
        validator: (value) => {
            return ['mini', 'small', 'middle', 'large'].includes(value)
        }
    },
    type: {
        type: String,
        default: 'default',
        validator: (value) => {
            return [
                'default',
                'primary',
                'plain',
                'danger',
                'gray',
                'warning'
            ].includes(value)
        }
    }
})
</script>
<style scoped lang="less">
.xtx-button {
    appearance: none;
    border: none;
    outline: none;
    background: #fff;
    text-align: center;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    border-radius: 7px;
}
.large {
    width: 240px;
    height: 50px;
    font-size: 16px;
}
.middle {
    width: 180px;
    height: 50px;
    font-size: 16px;
}
.small {
    width: 100px;
    height: 32px;
    font-size: 14px;
}
.mini {
    width: 60px;
    height: 32px;
    font-size: 14px;
}
.default {
    border-color: #e4e4e4;
    color: #666;
}
.primary {
    border-color: @xtxColor;
    background: @xtxColor;
    color: #fff;
}
.plain {
    border-color: @xtxColor;
    color: @xtxColor;
    background: lighten(@xtxColor, 50%);
}
.gray {
    border-color: #ccc;
    background: #ccc;
    color: #fff;
}
.danger {
    border-color: #ccc;
    background: red;
    color: #fff;
}
.warning {
    border-color: #ccc;
    background-color: #de781f;
    color: #fff;
}
</style>
