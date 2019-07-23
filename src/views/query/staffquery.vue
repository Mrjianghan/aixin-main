<template>
  <div class="staffQueryContainer">
      <div class="selectContainer">
          <div class="subSelect">
              <el-select v-model="value" placeholder="请选择" @change="startQuery">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
      </div>      
      <div class="searchContent">
          <div class="searchEvery">
                  <el-input @blur="empNoBlur"  v-model.trim="empNo" placeholder="员工号" clearable ></el-input>
            </div>
          <div class="searchEvery">
                  <el-input  v-model.trim="name" placeholder="姓名" clearable @blur="nameBlur"></el-input>
            </div>
          <div class="searchEvery">
                  <el-input  v-model.trim="minAmount" placeholder="最低金额" clearable @blur="minCheck"></el-input>
            </div>
          <div class="searchEvery">
                  <el-input  v-model.trim="maxAmount" placeholder="最高金额" clearable @blur="maxCheck"></el-input>
            </div>
          <div class="btnEvery">
                  <el-button type="primary"  @click="searchOn">搜索</el-button>
                </div>
              
              <div class="btnEvery">
                  <el-button type="primary"  @click="resetSearch">重置</el-button>
                </div>
      </div>      
	  <div class="amountContainer">
		  
		  <div class="flexfirst">
                            <div class="fir">留存余额：<span>{{head.valOne ? head.valOne : 0  }}</span>元</div>
                        </div>
                        <div class="flexsecond">
                            <div class="sec">其中本金：<span>{{head.valTwo ? head.valTwo : 0}}</span>元</div>
                        </div>
                        <div class="flexthird">
                            <div class="sec">其中利息：<span>{{head.valThree ? head.valThree : 0 }}</span>元</div>
                        </div>
		  
	  </div>
      <div class="tableCon">
                <el-table  :data="list"  border fit highlight-current-row style="width: 99%" stripe>
                  <el-table-column align="center" label="员工号">
                    <template slot-scope="scope">
                      <span>{{scope.row.empNo}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="姓名" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.name}} </span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="在职状态" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.workingState.message}} </span>
                    </template>
                  </el-table-column>

                    <el-table-column align="center" label="金额" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>￥{{scope.row.avaiableAmount}} </span>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" label="其中本金" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>￥{{scope.row.principal}} </span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="其中利息" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>￥{{scope.row.incomeAmount}}</span>
                    </template>
                  </el-table-column>
                </el-table>          
        </div>
        <div class="pagContainer">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="current" :page-sizes="[10,20,30, 50]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
      
  </div>
</template>

<script>
	import storejs from 'store';
    import api from "@/api/reqApi";
    import errInfo from '@/api/errInfo'
    export default {
        data(){
            return {
                current:1,
                total:0,
                list:[],
                size:10,
                value:'',
                options:[],
                empNo:'',
                name:'',
                minAmount:'',
                maxAmount:'',
				head: {
                    valOne: 0,
                    valTwo: 0,
                    valThree: 0
                },
            }
        },
        mounted(){            
            this.initQuery();            
        },
        methods:{  
			startQuery(){
                  console.log(this.value);
				storejs.set('queryStaffEnterprise',this.value);
                  let params = {
                        current:1,
                        size:10,
                        epId:this.value,
					  empNo:this.empNo ? this.empNo:null,
                    name:this.staffName ? this.staffName:null,
                    minAvaiableAmount:this.minAmount ? this.minAmount : null,
                    maxAvaiableAmount:this.maxAmount ? this.maxAmount :null,
                    };
                    this.getStaffAmount( params );
              },
			empNoBlur(){
				console.log(storejs);
				storejs.set('queryStaffEmpNo',this.empNo);
			},
			nameBlur(){
				console.log(storejs);
				storejs.set('queryStaffName',this.name);
			},
            minCheck(){
                 let exp = /^[0-9]*$/;
                  console.log(exp.test(this.minAmount) );
                  if(exp.test(this.minAmount)){
					  storejs.set('queryStaffMin',this.minAmount);
                  }else{
                      this.minAmount = '';
                  }
            },
            maxCheck(){
                 let exp = /^[0-9]*$/;
                  console.log(exp.test(this.maxAmount) );
                  if(exp.test(this.maxAmount)){
					  storejs.set('queryStaffMax',this.maxAmount);
                  }else{
                      this.maxAmount = '';
                  }
            },
            searchOn(){
                let params = {
                    current:1,
                    size:10,
                    epId:this.value,
                    empNo:this.empNo ? this.empNo:null,
                    name:this.staffName ? this.staffName:null,
                    minAvaiableAmount:this.minAmount ? this.minAmount : null,
                    maxAvaiableAmount:this.maxAmount ? this.maxAmount :null,
                };
                this.getStaffAmount( params );
            },
            resetSearch(){

				
				storejs.remove('queryStaffEnterprise');
				storejs.remove('queryStaffEmpNo');
				storejs.remove('queryStaffName');
				storejs.remove('queryStaffMin');
				storejs.remove('queryStaffMax');
				
                this.empNo = '';
                this.staffName = '';
                this.minAmount = '';
                this.maxAmount = '';
                let params = {
                    current:1,
                    size:10,
                    epId:this.value,
                };
                this.getStaffAmount( params );
            },
            initQuery(){
				let enterprise = storejs.get('queryStaffEnterprise');
				let empNo = storejs.get('queryStaffEmpNo');
				let name = storejs.get('queryStaffName');
				let min = storejs.get('queryStaffMin');
				let max = storejs.get('queryStaffMax');
				
				this.empNo = empNo ? empNo : '';
                this.staffName = name ? name : '';
                this.minAmount = min ? min : '';
                this.maxAmount = max ? max : '';
				
                api.enterpriseLists().then(res=>{
                        console.log(res);
                        if(res.success){                    
                            let data = res.data;
                                  console.log(data);
                                  if(data.length){
                                     this.options = data;
                                      this.value =enterprise ? enterprise : data[0].id;   
									  let params = {
										current:this.current,
										size:this.size,
										epId:this.value,
										empNo:empNo ? empNo:null,
										name:name ? name:null,
										minAvaiableAmount:min ? min : null,
										maxAvaiableAmount:max ? max :null,
									};
                                      this.getStaffAmount( params );
                                  }  
                        }else{
                            this.$message.error(res.message);
                        }
                    }).catch(err=>{
                        errInfo.err(err);
                    })  
            },
            getStaffAmount(params){
                api.queryStaffAmount(params).then(res=>{
                    if(res.success){
                        let data = res.data;
                        console.log( 'data',data );  
                        this.current = data.current;
                        this.total = data.total;
                        this.list = data.records;
						this.head = {
                            valOne:  res.data.extendData ? res.data.extendData.employeeAvailableCollect.totalAvailable :  0,
                            valTwo: res.data.extendData ? res.data.extendData.employeeAvailableCollect.totalPrincipal : 0,
                            valThree: res.data.extendData ? res.data.extendData.employeeAvailableCollect.totalIncome : 0
                        };
                    }else{
                        this.$message.error(res.message);
                    }
                }).catch(err=>{
                    errInfo.err(err);
                })
            },
            handleSizeChange(val){
                this.size = val;
                let params = {
                    current:this.current,
                    size:this.size,
                    epId:this.value,
					empNo:this.empNo ? this.empNo:null,
                    name:this.staffName ? this.staffName:null,
                    minAvaiableAmount:this.minAmount ? this.minAmount : null,
                    maxAvaiableAmount:this.maxAmount ? this.maxAmount :null,
                };
                this.getStaffAmount(params);
            },
            handleCurrentChange(val){
                this.current = val;
                let params = {
                    current:this.current,
                    size:this.size,
                    epId:this.value,
					empNo:this.empNo ? this.empNo:null,
                    name:this.staffName ? this.staffName:null,
                    minAvaiableAmount:this.minAmount ? this.minAmount : null,
                    maxAvaiableAmount:this.maxAmount ? this.maxAmount :null,
                };
                this.getStaffAmount(params);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .staffQueryContainer {
        padding: 20px;
        padding-bottom: 200px;
    }
    .tableCon {
        
    }
     .searchEvery {
        width: 200px;
        margin-right: 20px;
    }
    .searchContent {
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:flex-start;
        align-content: center;
        align-items: center;     
    }
    .pagContainer {        
        padding-top: 20px;  
    }
    .btnEvery {
        margin-right: 20px;
    }
    .subSelect {
        width: 300px;
        margin-bottom: 20px;
    }
	.amountContainer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: center;
		align-items: center;
		margin-bottom: 20px;
		font-size: 14px;
		span {
			color: #6479ff;
		}
	}
</style>
<style>
    @import url(../../globalStyle/table.css); 
    .staffQueryContainer .searchContent .searchEvery .el-input input {
        color: #000 !important;
    }
    .staffQueryContainer .searchContent .el-input__inner {
        border-color: #854343 !important;
    }
</style>

