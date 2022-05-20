  <template>
  <!--是否行内表单-->
    <el-form ref="form" label-width="100px" :model="form" :inline="inline">
      <!--标签显示名称-->
      <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
            <!--v-model是对数据进行绑定-->
            <el-input
                v-if="item.type === 'input'"
                :placeholder="'请输入' + item.label"
                v-model="form[item.model]"
            ></el-input>
            <el-input
                v-if="item.type === 'textInput'"
                type="textarea"
                v-model="form[item.model]"
            ></el-input>
            <el-switch v-if="item.type === 'switch'" v-model="form[item.model]"></el-switch>
            <el-select
                v-if="item.type === 'select'"
                :placeholder="'请选择' + item.label"
                v-model="form[item.model]"
            >
                <el-option 
                    v-for="item in item.opts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-select
                v-if="item.type === 'multiSelect'"
                :placeholder="'请选择' + item.label"
                multiple
                v-model="form[item.model]"
            >
                <el-option 
                    v-for="item in item.opts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
      </el-form-item>
      <!--预留一个插槽 下面的不一样的地方可以灵活的处理(就是说上面的都不符合的话可以处理)-->
      <el-form-item><slot></slot></el-form-item>
    </el-form>
  </template>

<!-- formLabel 是标签数据 -->
  <script>
  export default {
    name: 'CommonForm',
    props: {
      formLabel: Array,
      form: Object,
      inline:Boolean
    },
    data(){
      return{}
    }
  };
  </script>
  <style lang="scss" scoped></style>
