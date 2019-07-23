<template>
  <div class="multipleQueryContainer">
      
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
          <div class="searchEvery limit">
                  <el-input  v-model.trim="empNo" placeholder="姓名" clearable></el-input>
            </div>
          <div class="searchEvery limit">
              <el-select v-model="getType" placeholder="请选择类型" >    
                  <el-option label="全部" value=""></el-option>
                    <el-option label="提现" value="WITHDRAW"></el-option>
                    <el-option label="工资发放" value="SALARY"></el-option>
                    <el-option label="奖金" value="BONUS"></el-option>
                    <el-option label="其它" value="OTHER"></el-option>
                    <el-option label="收益" value="PROFIT"></el-option>
                </el-select>
            </div>
          
          <div class="searchEvery limit">
              <el-select v-model="getStatus" placeholder="请选择状态" >
                            <el-option label="全部" value=""></el-option>
                            <el-option label="申请中" value="APPLYING"></el-option>
                            <el-option label="打款中" value="	PENDING"></el-option>
                            <el-option label="成功" value="SUCCESS"></el-option>
                        </el-select>
            </div>
                   
                  <div class="span">创建日期</div>
                  <div class="searchEvery">
                    <el-date-picker v-model="value5"  type="daterange"  align="left"  unlink-panels  format="yyyy-MM-dd"  value-format="yyyy-MM-dd"  range-separator="至"  start-placeholder="开始日期"  end-placeholder="结束日期" :picker-options="pickerOptions2"  >
                    </el-date-picker>
                  </div>     
          
          
                <div class="span">完成日期</div>
          <div class="searchEvery">
              <el-date-picker v-model="value6"  type="daterange"  align="left"  unlink-panels  format="yyyy-MM-dd"  value-format="yyyy-MM-dd"  range-separator="至"  start-placeholder="开始日期"  end-placeholder="结束日期" :picker-options="pickerOptions2" >
                            </el-date-picker>
            </div>
                            
              
          
          
      </div>
      <div class="searchContent">
          <div class="btnEvery">
                  <el-button type="primary"  @click="searchOn">搜索</el-button>
                </div>
              
              <div class="btnEvery">
                  <el-button type="primary"  @click="resetSearch">重置</el-button>
                </div>
      </div>
	  <div class="amountContainer">
		  		<div class="flexfirst">
                            <div class="fir">发放总额：<span>{{head.valOne ? head.valOne : 0 }}</span>元</div>
                 </div>
                        <div class="flexsecond">
                            <div class="sec">收益分配总额：<span>{{head.valTwo ? head.valTwo : 0 }}</span>元</div>
                        </div>
                        <div class="flexthird">
                            <div class="thi">提现总额：<span>{{head.valThree ? head.valThree : 0  }}</span>元</div>
                        </div>
                        <div class="flexfourth">
                            <div class="fou">留存总额：<span>{{head.valFour ? head.valFour : 0 }}</span>元</div>
                        </div>
	  </div>
        
      <div class="tableCon">
                <el-table  :data="list"  border fit highlight-current-row style="width: 99%" stripe>
                  <el-table-column align="center" label="账单号" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.billNo}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" label="账单类型" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.transCode.message}} </span>
                    </template>
                  </el-table-column>
                   <el-table-column align="center" label="员工号" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.empNo}} </span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="姓名" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.name}} </span>
                    </template>
                  </el-table-column>
                   <el-table-column align="center" label="账单状态" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.status.message}} </span>
                    </template>
                  </el-table-column>
                 <el-table-column align="center" label="创建时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.gmtCreate}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="完成时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.gmtSuccess}}</span>
                    </template>
                  </el-table-column>
                     <el-table-column align="center" label="发生金额" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>￥{{scope.row.amount}}</span>
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
                getType:'',                
                getStatus:'',
                value5:'',
                value6:'',
				head:{
					valOne:0,
					valTwo:0,
					valThree:0,
					valFour:0,
				},
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },

            }
        },
        mounted(){
            this.initQuery();
        },
        methods:{
            searchOn (){
                let params = {
                    current:1,
                    size:10,
                    epId:this.value,
                    name: this.empNo ? this.empNo :null,
                    transCode: this.getType ? this.getType :null,
                    minGmtCreate: this.value5 ? this.value5[0] :null,
                    maxGmtCreate: this.value5? this.value5[1] :null,
                    minGmtSuccessCreate:this.value6 ? this.value6[0] :null,
                    maxGmtSuccessCreate:this.value6 ? this.value6[1] :null,
                    status:this.getStatus ? this.getStatus : null,
                };
                this.getMutipleAmount( params );
                
            },
            resetSearch (){      
                this.empNo = '';
                this.getType = '';
                this.value5 = '';
                this.getStatus = '';
                this.value6 = '';
                let params = {
                    current:this.current,
                    size:this.size,
                    epId:this.value,                  
                };
                this.getMutipleAmount( params );
            },
           
            initQuery(){
                api.enterpriseLists().then(res=>{                       
                        if(res.success){                    
                            let data = res.data;
                                  console.log(data);
                                  if(data.length){
                                     this.options = data;
                                      this.value = data[0].id;   
                                      let params = {
                                          current:1,
                                          size:10,
                                          epId:this.value,
                                      };
                                      this.getMutipleAmount( params );
                                  }  
                        }else{
                            this.$message.error( res.message );
                        }
                    }).catch(err=>{
                        errInfo.err(err);
                    })  
            },
            startQuery(){
                console.log(this.value);  
                let params = {
                        current:this.current,
                        size:this.size,
                        epId:this.value,
					name: this.empNo ? this.empNo :null,
                    transCode: this.getType ? this.getType :null,
                    minGmtCreate: this.value5 ? this.value5[0] :null,
                    maxGmtCreate: this.value5? this.value5[1] :null,
                    minGmtSuccessCreate:this.value6 ? this.value6[0] :null,
                    maxGmtSuccessCreate:this.value6 ? this.value6[1] :null,
                    status:this.getStatus ? this.getStatus : null,
                };
                this.getMutipleAmount( params );
            },
            getMutipleAmount(params){
                api.queryMutipleAmount(params).then(res=>{
                    if(res.success){
                        let data = res.data;
                        console.log( 'data',data );  
                        this.current = data.current;
                        this.total = data.total;
                        this.list = data.records;
						this.head={
							valOne: res.data.extendData ? res.data.extendData.billCollect.totalGrant : 0,
                            valTwo: res.data.extendData ? res.data.extendData.billCollect.totalGrantIncome :0,
                            valThree: res.data.extendData ? res.data.extendData.billCollect.totalWithdraw : 0,
                            valFour: res.data.extendData ? res.data.extendData.billCollect.totalAvailable : 0,
						};
                        console.log('list',this.list);
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
					name: this.empNo ? this.empNo :null,
                    transCode: this.getType ? this.getType :null,
                    minGmtCreate: this.value5 ? this.value5[0] :null,
                    maxGmtCreate: this.value5? this.value5[1] :null,
                    minGmtSuccessCreate:this.value6 ? this.value6[0] :null,
                    maxGmtSuccessCreate:this.value6 ? this.value6[1] :null,
                    status:this.getStatus ? this.getStatus : null,
                };
                this.getMutipleAmount(params);
            },
            handleCurrentChange(val){
                this.current = val;
                let params = {
                    current:this.current,
                    size:this.size,
                    epId:this.value,
					name: this.empNo ? this.empNo :null,
                    transCode: this.getType ? this.getType :null,
                    minGmtCreate: this.value5 ? this.value5[0] :null,
                    maxGmtCreate: this.value5? this.value5[1] :null,
                    minGmtSuccessCreate:this.value6 ? this.value6[0] :null,
                    maxGmtSuccessCreate:this.value6 ? this.value6[1] :null,
                    status:this.getStatus ? this.getStatus : null,
                };
                this.getMutipleAmount(params);
            },
        }

    }
</script>

<style lang="scss" scoped>
    .multipleQueryContainer {
        padding: 20px;
        padding-bottom: 200px;
    }    
    .subSelect {
        width: 300px;
        margin-bottom: 20px;
    }
    .pagContainer {        
        padding-top: 20px;  
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
        .span {
            margin-right: 10px;
            font-size: 14px;
            width: 56px;
        }
    }
    .limit {
        width: 150px;
    }
    .btnEvery {
        margin-right: 20px;
    }
</style>
<style>
    @import url(../../globalStyle/table.css); 
    .multipleQueryContainer .searchContent .searchEvery .el-input input {
        color: #000 !important;
    }
    .multipleQueryContainer .searchContent .el-input__inner {
        border-color: #854343 !important;
    }
</style>