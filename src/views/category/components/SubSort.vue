<template>
    <div class="sub-sort">
        <div class="sort">
            <a
                :class="{ active: sortParams.sortField === null }"
                @click="changeSort(null)"
                href="javascript:;"
                >默认排序</a
            >
            <a
                :class="{ active: sortParams.sortField === 'publishTime' }"
                @click="changeSort('publishTime')"
                href="javascript:;"
                >最新商品</a
            >
            <a
                :class="{ active: sortParams.sortField === 'orderNum' }"
                @click="changeSort('orderNum')"
                href="javascript:;"
                >最高人气</a
            >
            <a
                :class="{ active: sortParams.sortField === 'evaluateNum' }"
                @click="changeSort('evaluateNum')"
                href="javascript:;"
                >评论最多</a
            >
            <a @click="changeSort('price')" href="javascript:;">
                价格排序
                <i
                    class="arrow up"
                    :class="{
                        active:
                            sortParams.sortField === 'price' &&
                            sortParams.sortMethod === 'asc'
                    }"
                />
                <i
                    class="arrow down"
                    :class="{
                        active:
                            sortParams.sortField === 'price' &&
                            sortParams.sortMethod === 'desc'
                    }"
                />
            </a>
        </div>
        <div class="check">
            <XtxCheckBox @change="changeCheck" v-model="sortParams.inventory"
                >仅显示有货商品</XtxCheckBox
            >
            <XtxCheckBox @change="changeCheck" v-model="sortParams.onlyDiscount"
                >仅显示特惠商品</XtxCheckBox
            >
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['sortChange'])
// 实现交互（实现交换的数据和后台保持一致）
// 1. 明确交互数据
const sortParams = ref({
    inventory: false,
    onlyDiscount: false,
    sortField: null, // publishTime,orderNum,price,evaluateNum
    sortMethod: null // asc为正序，desc为倒序，默认为desc
})
// 2. 提供模板使用
// 3. 需要绑定按钮的点击事件修改排序字段和排序方式
const changeSort = (sortField) => {
    if (sortField === 'price') {
        sortParams.value.sortField = sortField
        // 处理排序
        if (sortParams.value.sortMethod === null) {
            sortParams.value.sortMethod = 'desc'
        } else {
            sortParams.value.sortMethod =
                sortParams.value.sortMethod === 'desc' ? 'asc' : 'desc'
        }
    } else {
        // 如果已经选项阻止运行
        if (sortParams.value.sortField === sortField) return
        sortParams.value.sortField = sortField
        sortParams.value.sortMethod = null
    }
    // 触发 sortChange 事件
    emit('sortChange', sortParams.value)
}
const changeCheck = (checked) => {
    // 触发 sortChange 事件
    emit('sortChange', sortParams.value)
}
</script>
<style scoped lang="less">
.sub-sort {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sort {
        display: flex;
        a {
            height: 30px;
            line-height: 28px;
            border: 1px solid #e4e4e4;
            padding: 0 20px;
            margin-right: 20px;
            color: #999;
            border-radius: 2px;
            position: relative;
            transition: all 0.3s;
            &.active {
                background: @xtxColor;
                border-color: @xtxColor;
                color: #fff;
            }
            .arrow {
                position: absolute;
                border: 5px solid transparent;
                right: 8px;
                &.up {
                    top: 3px;
                    border-bottom-color: #bbb;
                    &.active {
                        border-bottom-color: @xtxColor;
                    }
                }
                &.down {
                    top: 15px;
                    border-top-color: #bbb;
                    &.active {
                        border-top-color: @xtxColor;
                    }
                }
            }
        }
    }
    .check {
        .xtx-checkbox {
            margin-left: 20px;
            color: #999;
        }
    }
}
</style>
