<template>
<div class="body">

    <div id="courseTable" style="clear:left; margin-top:30px" class="_ajax_target">	
        <table class="gridtable" style="width:99%;text-align:center;">
		<thead class="gridhead">
			<tr>
	        	<th style="width:55px; border-width: 1px; border-style: solid; border-color: black;">
					<div style="width:0px;height:0px;border-top:30px #C7DBFF solid;border-left:79px #DEEDF7 solid; position:relative;">
			        	<span style="width:40px;text-align:center;position:absolute;top:-30px;left:-40px;">星期</span>
			        	<span style="width:40px;text-align:center;position:absolute;top:-18px;left:-80px;">小节</span>
			        </div>
			    </th>
				    	<th class="week">星期一</th>
				    	<th class="week">星期二</th>
				    	<th class="week">星期三</th>
				    	<th class="week">星期四</th>
				    	<th class="week">星期五</th>
				    	<th class="week">星期六</th>
				    	<th class="week">星期日</th>
			</tr>
		</thead>
		<tbody>
					<tr>
						<th class="subsection">第一节</th>
						<td class="electableCell">{{tableData[0][0]}}</td>
						<td class="electableCell">{{tableData[1][0]}}</td>
						<td class="electableCell">{{tableData[2][0]}}</td>
						<td class="electableCell">{{tableData[3][0]}}</td>
						<td class="electableCell">{{tableData[4][0]}}</td>
						<td class="electableCell">{{tableData[5][0]}}</td>
						<td class="electableCell">{{tableData[6][0]}}</td>
					</tr>
					<tr>
						<th class="subsection">第二节</th>
						<td class="electableCell">{{tableData[0][1]}}</td>
						<td class="electableCell">{{tableData[1][1]}}</td>
						<td class="electableCell">{{tableData[2][1]}}</td>
						<td class="electableCell">{{tableData[3][1]}}</td>
						<td class="electableCell">{{tableData[4][1]}}</td>
						<td class="electableCell">{{tableData[5][1]}}</td>
						<td class="electableCell">{{tableData[6][1]}}</td>
					</tr>
					<tr>
						<th class="subsection">第三节</th>
						<td class="electableCell">{{tableData[0][2]}}</td>
						<td class="electableCell">{{tableData[1][2]}}</td>
						<td class="electableCell">{{tableData[2][2]}}</td>
						<td class="electableCell">{{tableData[3][2]}}</td>
						<td class="electableCell">{{tableData[4][2]}}</td>
						<td class="electableCell">{{tableData[5][2]}}</td>
						<td class="electableCell">{{tableData[6][2]}}</td>
					</tr>
					<tr>
						<th class="subsection">第四节</th>
						<td class="electableCell">{{tableData[0][3]}}</td>
						<td class="electableCell">{{tableData[1][3]}}</td>
						<td class="electableCell">{{tableData[2][3]}}</td>
						<td class="electableCell">{{tableData[3][3]}}</td>
						<td class="electableCell">{{tableData[4][3]}}</td>
						<td class="electableCell">{{tableData[5][3]}}</td>
						<td class="electableCell">{{tableData[6][3]}}</td>
					</tr>
					<tr>
						<th class="subsection">第五节</th>
						<td class="electableCell">{{tableData[0][4]}}</td>
						<td class="electableCell">{{tableData[1][4]}}</td>
						<td class="electableCell">{{tableData[2][4]}}</td>
						<td class="electableCell">{{tableData[3][4]}}</td>
						<td class="electableCell">{{tableData[4][4]}}</td>
						<td class="electableCell">{{tableData[5][4]}}</td>
						<td class="electableCell">{{tableData[6][4]}}</td>
					</tr>
					<tr>
						<th class="subsection">第六节</th>
						<td class="electableCell">{{tableData[0][5]}}</td>
						<td class="electableCell">{{tableData[1][5]}}</td>
						<td class="electableCell">{{tableData[2][5]}}</td>
						<td class="electableCell">{{tableData[3][5]}}</td>
						<td class="electableCell">{{tableData[4][5]}}</td>
						<td class="electableCell">{{tableData[5][5]}}</td>
						<td class="electableCell">{{tableData[6][5]}}</td>
					</tr>
					<tr>
						<th class="subsection">第七节</th>
						<td class="electableCell">{{tableData[0][6]}}</td>
						<td class="electableCell">{{tableData[1][6]}}</td>
						<td class="electableCell">{{tableData[2][6]}}</td>
						<td class="electableCell">{{tableData[3][6]}}</td>
						<td class="electableCell">{{tableData[4][6]}}</td>
						<td class="electableCell">{{tableData[5][6]}}</td>
						<td class="electableCell">{{tableData[6][6]}}</td>
					</tr>
					<tr>
						<th class="subsection">第八节</th>
						<td class="electableCell">{{tableData[0][7]}}</td>
						<td class="electableCell">{{tableData[1][7]}}</td>
						<td class="electableCell">{{tableData[2][7]}}</td>
						<td class="electableCell">{{tableData[3][7]}}</td>
						<td class="electableCell">{{tableData[4][7]}}</td>
						<td class="electableCell">{{tableData[5][7]}}</td>
						<td class="electableCell">{{tableData[6][7]}}</td>
					</tr>
					<tr>
						<th class="subsection">第九节</th>
						<td class="electableCell">{{tableData[0][8]}}</td>
						<td class="electableCell">{{tableData[1][8]}}</td>
						<td class="electableCell">{{tableData[2][8]}}</td>
						<td class="electableCell">{{tableData[3][8]}}</td>
						<td class="electableCell">{{tableData[4][8]}}</td>
						<td class="electableCell">{{tableData[5][8]}}</td>
						<td class="electableCell">{{tableData[6][8]}}</td>
					</tr>
					<tr>
						<th class="subsection">第十节</th>
						<td class="electableCell">{{tableData[0][9]}}</td>
						<td class="electableCell">{{tableData[1][9]}}</td>
						<td class="electableCell">{{tableData[2][9]}}</td>
						<td class="electableCell">{{tableData[3][9]}}</td>
						<td class="electableCell">{{tableData[4][9]}}</td>
						<td class="electableCell">{{tableData[5][9]}}</td>
						<td class="electableCell">{{tableData[6][9]}}</td>
					</tr>
		</tbody>
	</table>
	</div>
	<!--:class哪里是通过动态改变class的方式让这个空状态消失 -->
	<el-empty  
		:class="{ 'notEmpty': notEmpty }"
		ref="emptyState" 
		description="当前不在选课时间内">
	</el-empty>
	<el-tabs type="border-card">
	<el-tab-pane label="可选课程">
		<common-table
          :tableData="tableData1111"
          :tableLabel="tableLabel"
          :config="config"

          @changePage="getList()"
      >
      </common-table>
	</el-tab-pane>
	<el-tab-pane label="已选课程">
		<common-table
          :tableData="tableData1111"
          :tableLabel="tableLabel"
          :config="config"

          @changePage="getList()"
      >
      </common-table>
	</el-tab-pane>

	</el-tabs>
</div>
</template>
<script>
import CommonTable from '@/components/CommonTable.vue'
export default{
    name:'Select',
	components: {
		CommonTable
	},
    data(){
        return{
			//7行10列。tableData[星期][第几节]
			tableData:[
				["体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语",],
				["体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语",],
				["体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语",],
				["体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语",],
				["体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语",],
				["体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语",],
				["体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语","体育赛事英语",]
			],
			isEmpty: 'none',
			mycolor: 'blue',
			notEmpty: true,
			tableData1111: [],
			tableLabel: [
				{
					prop: "create_time",
					label: "创建时间",
					width: 120
				},
				{
					prop: "curriculum_name",
					label: "课程名称",
					width: 300
				},
				{
					prop: "category_label",
					label: "课程类型",
					width: 120
				},
				{
					prop: "teacher",
					label: "主讲教师",
					width: 150
				},
				{
					prop: "credit",
					label: "学分",
					width: 50
				}
			],
			config: {
				total: 10,
				page: 1,
				entry_per_page: 10
			}

		}
    },
	methods:{
		
	}
}
</script>

<style scoped>
.electableCell{
    border-width: 1px;
    border-style: solid;
    border-color: black;
	width:99px;
	height:30px;
	align-content: center;
	vertical-align: middle;
}
.subsection{
	border-width: 1px;
    border-style: solid;
    border-color: black;
	width:99px;
	height:30px;
	background:#DEEDF7;
	align-content: center;
	vertical-align: middle;
}
.week{
	border-width: 1px;
    border-style: solid;
    border-color: black;
	width:99px;
	height:20px;
	background:#DEEDF7;
	align-content: center;
	vertical-align: middle;
}
.notEmpty{
	display: none; 
}
</style>