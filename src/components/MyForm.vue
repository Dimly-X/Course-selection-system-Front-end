<template>
  <!--是否行内表单-->
  <el-form ref="form" label-width="auto" >
    <el-row v-for="(row,index) in form"
            :key="index"
            :gutter="row.gutter!==null?row.gutter:0"
            >
      <el-col v-for="(Item,index) in row.items"
              :key="index"
              :span="Item.span!==null?Item.span:24"
              :offset="Item.offset!==null?Item.offset:0"
              :push="Item.push!==null?Item.push:0"
              :pull="Item.pull!==null?Item.pull:0"
              >
        <!--标签显示名称-->
        <el-form-item :label="Item.item.label">
          <el-date-picker
              v-if="Item.item.type === 'datePicker'"
              v-model="formData[Item.item.model]"
              :type="Item.item.itype!=null?Item.item.itype:'date'"
              :range-separator="Item.item.rangeSeparator!=null?Item.item.rangeSeparator:'-'"
              :start-placeholder="Item.item.startPlaceholder!=null?Item.item.startPlaceholder:null"
              :end-placeholder="Item.item.endPlaceholder!=null?Item.item.endPlaceholder:null"
              align="right">asdg
          </el-date-picker>
          <el-input-number
              :min="Item.item.min!==null? Item.item.min:-Infinity"
              :max="Item.item.max!==null? Item.item.max:Infinity"
              :step="Item.item.step!==null? Item.step:1"
              v-if="Item.item.type === 'inputNumber'"
              :placeholder="'设置' + Item.item.label"
              v-model="formData[Item.item.model]"
          ></el-input-number>
          <!--v-model是对数据进行绑定-->
          <el-input
              v-if="Item.item.type === 'input'"
              :placeholder="'请输入' + Item.item.label"
              v-model="formData[Item.item.model]"
          ></el-input>
          <el-input
              v-if="Item.item.type === 'textInput'"
              :placeholder="'请输入' + Item.item.label"
              type="textarea"
              v-model="formData[Item.item.model]"
          ></el-input>
          <el-switch v-if="Item.item.type === 'switch'" v-model="formData[Item.item.model]"></el-switch>
          <el-select
              v-if="Item.item.type === 'select'"
              :placeholder="'请选择' + Item.item.label"
              v-model="formData[Item.item.model]"
          >
            <el-option
                v-for="it in Item.item.opts"
                :key="it.value"
                :label="it.label"
                :value="it.value"
            ></el-option>
          </el-select>
          <el-select
              v-if="Item.item.type === 'multiSelect'"
              :placeholder="'请选择' + Item.item.label"
              multiple
              v-model="formData[Item.item.model]"
          >
            <el-option
                v-for="it in Item.item.opts"
                :key="it.value"
                :label="it.label"
                :value="it.value"
            ></el-option>
          </el-select>
        </el-form-item>

      </el-col>
    </el-row>

  </el-form>
</template>

<!-- formLabel 是标签数据 -->
<script>
export default {
  name: 'MyForm',
  props: ['form', 'formData'],
  data() {
    return {
    };
  },

};
</script>
<style lang="scss" scoped>
</style>
