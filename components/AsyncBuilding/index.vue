<template>
  <div>
    <div class="headerWarp  ml20" :style="width">
      <el-cascader
        v-model="region"
        placeholder="层级:组团>楼幢>单元>房间"
        :options="buildings"
        :props="buildingCasProps"
        clearable
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { buildingsList } from '@/api/buildings/index'

export default {
  components: {},
  props: {
    width: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      buildingCasProps: {
        label: 'name',
        checkStrictly: true,
        value: 'id',
        // leaf: 'leaf',
        lazy: true, // 此处必须为true
        lazyLoad: this.buildingCascaderLazyLoad
      },
      cascaderKey: 1,
      searchForm: {
        // estate_id: 1
        page: 1,
        limit: 15
      },
      region: [], // level	层级: 1组团 2：楼幢 3：单元 4：房间
      buildings: []
    }
  },
  computed: {
    estate_id() {
      return window.localStorage.getItem('estate_id')
    },
    activity_id() {
      return window.localStorage.getItem('activity_id')
    }
  },
  watch: {
    // 切换数据源 防止复用组件报错
    resultOption() {
      ++this.cascaderKey
    }
  },
  async mounted() {
    this.searchForm.estate_id = this.estate_id
    this.searchForm.activity_id = this.activity_id
    // 楼栋列表
    const { data: buildingsListData } = await buildingsList({
      estate_id: this.estate_id,
      level: 1,
      leaf_type: 'boolean'
    })
    // if (status !== 'success') return this.$message.error(message)
    // console.log('buildingsList', buildingsListData)
    this.buildings = buildingsListData.data
  },

  methods: {
    // 房间号级联查询变化
    handlePageChange(value) {
      // console.log(value)
      // level	层级: 1组团 2：楼幢 3：单元 4：房间
      this.searchForm.group_id = value[0]
      this.searchForm.building_id = value[1]
      this.searchForm.unit_id = value[2]
      this.searchForm.room_id = value[3]
      this.$emit('change', value)
      // console.log(this.region, 'this.region')
    },
    // 楼栋列表
    async getBuildingChange(data, resolve, level) {
      // console.log(data, resolve, level)
      const { data: buildingsListData } = await buildingsList({
        estate_id: this.estate_id,
        parent_id: data.id,
        leaf_type: 'boolean'
      })
      resolve(
        buildingsListData.data.map(el => {
          return {
            ...el,
            leaf: Boolean(el.leaf)
          }
        })
      )
      // console.log('buildingsList', buildingsListData)
    },
    // 楼栋异步加载
    buildingCascaderLazyLoad(node, resolve) {
      if (!node) {
        return false
      }
      const { level, data } = node
      // console.log(node, level)
      // console.log(node)
      if (level <= 4 && level > 0) {
        // console.log(data, level)
        this.getBuildingChange(data, resolve, level)
      }
      // else if (level === 2) {
      //   this.getBuildingChange(data, resolve, level)
      // } else if (level === 3) {
      //   this.getBuildingChange(data, resolve, level)
      // } else if (level === 4) {
      //   this.getBuildingChange(data, resolve, level)
      // }
    }
  }
}
</script>

<style lang="scss" scoped></style>
