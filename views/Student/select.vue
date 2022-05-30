<template>
<div>

    <div id="courseTable" style="clear:left;" class="_ajax_target">	
        <table class="gridtable" style="width:99%;text-align:center;">
		<thead class="gridhead">
			<tr>
	        	<th style="width:55px">
					<div style="width:0px;height:0px;border-top:30px #C7DBFF solid;border-left:79px #DEEDF7 solid; position:relative;">
			        	<span style="width:40px;text-align:center;position:absolute;top:-30px;left:-40px;">星期</span>
			        	<span style="width:40px;text-align:center;position:absolute;top:-18px;left:-80px;">小节</span>
			        </div>
			    </th>
				    	<th style="width:99px;;height:20px;background:#DEEDF7;">星期一</th>
				    	<th style="width:99px;;height:20px;background:#DEEDF7;">星期二</th>
				    	<th style="width:99px;;height:20px;background:#DEEDF7;">星期三</th>
				    	<th style="width:99px;;height:20px;background:#DEEDF7;">星期四</th>
				    	<th style="width:99px;;height:20px;background:#DEEDF7;">星期五</th>
				    	<th style="width:99px;;height:20px;background:#DEEDF7;">星期六</th>
				    	<th style="width:99px;;height:20px;background:#DEEDF7;">星期日</th>
			</tr>
		</thead>
		<tbody>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第一节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="1" weekday="1">6</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="1" weekday="2">7</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="1" weekday="3">2</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="1" weekday="4">9</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="1" weekday="5">10</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="1" weekday="6"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="1" weekday="7"></td>
					</tr>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第二节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="2" weekday="1">6</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="2" weekday="2">7</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="2" weekday="3">2</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="2" weekday="4">9</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="2" weekday="5">10</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="2" weekday="6">1</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="2" weekday="7">1</td>
					</tr>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第三节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="3" weekday="1">6</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="3" weekday="2">7</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="3" weekday="3">4</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="3" weekday="4">11</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="3" weekday="5">9</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="3" weekday="6">2</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="3" weekday="7">2</td>
					</tr>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第四节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="4" weekday="1">6</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="4" weekday="2">7</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="4" weekday="3">3</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="4" weekday="4">11</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="4" weekday="5">9</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="4" weekday="6">2</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="4" weekday="7">2</td>
					</tr>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第五节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="5" weekday="1"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="5" weekday="2"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="5" weekday="3">1</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="5" weekday="4"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="5" weekday="5"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="5" weekday="6">2</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="5" weekday="7">2</td>
					</tr>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第六节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="6" weekday="1">10</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="6" weekday="2">2</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="6" weekday="3"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="6" weekday="4">8</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="6" weekday="5">35</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="6" weekday="6">3</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="6" weekday="7">2</td>
					</tr>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第七节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="7" weekday="1">11</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="7" weekday="2">2</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="7" weekday="3"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="7" weekday="4">9</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="7" weekday="5">35</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="7" weekday="6">3</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="7" weekday="7">2</td>
					</tr>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第八节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="8" weekday="1">4</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="8" weekday="2">1</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="8" weekday="3"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="8" weekday="4">6</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="8" weekday="5">30</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="8" weekday="6">2</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="8" weekday="7">1</td>
					</tr>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第九节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="9" weekday="1">4</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="9" weekday="2">1</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="9" weekday="3"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="9" weekday="4">5</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="9" weekday="5">12</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="9" weekday="6"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="9" weekday="7"></td>
					</tr>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第十节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="10" weekday="1">1</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="10" weekday="2"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="10" weekday="3"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="10" weekday="4">3</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="10" weekday="5">1</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="10" weekday="6"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="10" weekday="7"></td>
					</tr>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第十一节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="11" weekday="1">68</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="11" weekday="2">6</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="11" weekday="3">76</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="11" weekday="4">5</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="11" weekday="5">2</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="11" weekday="6"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="11" weekday="7"></td>
					</tr>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第十二节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="12" weekday="1">68</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="12" weekday="2">6</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="12" weekday="3">76</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="12" weekday="4">5</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="12" weekday="5">2</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="12" weekday="6"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="12" weekday="7"></td>
					</tr>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第十三节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="13" weekday="1">63</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="13" weekday="2">5</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="13" weekday="3">70</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="13" weekday="4">3</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="13" weekday="5">2</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="13" weekday="6"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="13" weekday="7"></td>
					</tr>
					<tr>
						<th style="width:99px;;height:20px;background:#DEEDF7;">
第十四节						</th>
						<td style="width:99px;;height:20px;" class="electableCell" unit="14" weekday="1">1</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="14" weekday="2"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="14" weekday="3">1</td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="14" weekday="4"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="14" weekday="5"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="14" weekday="6"></td>
						<td style="width:99px;;height:20px;" class="electableCell" unit="14" weekday="7"></td>
					</tr>
		</tbody>
	</table>
</div>
</div>
</template>
<script>

export default{
    name:'Select',
    data(){
        return{}
    }
}
</script>

<style scoped>
.electableCell{
    border-width: 1px;
    border-style: solid;
    border-color: blue;
}
</style>