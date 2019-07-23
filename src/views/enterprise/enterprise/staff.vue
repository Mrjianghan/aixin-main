<template>
  <div class="staffContainer">
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
          
          <div class="inputContainer">
          
              <div class="searchEvery">
                  <el-input  v-model.trim="empNo" placeholder="员工号" clearable @blur="empNoBlur"></el-input>

                </div>

              <div class="searchEvery">
                  <el-input  v-model.trim="name" placeholder="姓名" clearable @blur="nameBlur"></el-input>
                </div>

              <div class="searchEvery">
                  <el-input  v-model.trim="phone" @blur="phoneCheck" placeholder="手机号" clearable></el-input>
                </div>
              
              <div class="btnEvery">
                  <el-button type="primary"  @click="searchOn">搜索</el-button>
                </div>
              
              <div class="btnEvery">
                  <el-button type="primary"  @click="resetSearch">重置</el-button>
                </div>
              
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
                    <el-table-column align="center" label="证件类型" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.certificateType.message}} </span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="证件号" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.idNo}} </span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="入职时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.hiredate}} </span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="手机号码" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.username}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="在职状态" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.workingState.message}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="所属部门" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.department}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="职位" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.position}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="税后工资" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>￥{{scope.row.afterAmount}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="开户银行" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.bankName}}</span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="银行卡号" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.bankNo}}</span>
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
          data() {
            return {
                list:[],
                current:1,
                size:10,
                total:0,
                value:'',
                options:[],
                empNo:'',
                name:'',
                phone:'',
            };
          },
          computed: {},
          mounted(){
              this.initLists();
          },
          methods: {
			   startQuery(){
                  console.log(this.value);
				  storejs.set('enterpriseName',this.value)
                  let data ={
                        current:this.current,
                        size:this.size,
                        epId:this.value,
                  };
                  this.getStaff(data);
              },
			  empNoBlur(){
				  storejs.set('enterpriseStaffNo',this.empNo);
			  },
			  nameBlur(){
				  storejs.set('enterpriseUser',this.name);
			  },
              phoneCheck(){
                  let exp = /^[0-9]*$/;
                  console.log(exp.test(this.phone) );
                  if(exp.test(this.phone)){
					  storejs.set('enterprisePhone',this.phone);
                  }else{
                      this.phone = '';
                  }
              },
              searchOn(){
                  let params = {
                      empNo:this.empNo ? this.empNo : null,
                      name:this.name ?this.name : null ,
                      mobile:this.phone ? this.phone : null,
                      current:this.current,
                      size:this.size,
                      epId:this.value,
                  };
                  this.getStaff(params);
              },
              resetSearch(){
				  storejs.remove('enterpriseName');
				  storejs.remove('enterpriseStaffNo');
				  storejs.remove('enterpriseUser');
				  storejs.remove('enterprisePhone');
				  
                  this.empNo = '';
                  this.name = '';
                  this.phone = '';                  
                  let params = {
                      current:this.current,
                      size:this.size,
                      epId:this.value,
                  };
                  this.getStaff(params);
              
                },
              initLists(){					  
				  let name = storejs.get('enterpriseName');
				  let staffNo = storejs.get('enterpriseStaffNo');
				  let user = storejs.get('enterpriseUser');
				  let phone = storejs.get('enterprisePhone');
				  
				  this.empNo = staffNo ? staffNo : '';
                  this.name = user ? user : '';
                  this.phone = phone ? phone : '';  
				  
                  api.enterpriseLists().then(res=>{
                      if(res.success){                      
                          let data = res.data;
                          console.log(data);
                          if(data.length){
                             this.options = data;
                              this.value = name ? name : data[0].id;	
							  
							  let params = {
								  empNo:staffNo ? staffNo : null,
								  name:user ?user : null ,
								  mobile:phone ? phone : null,
								  epId:this.value,
								  current:this.current,
								  size:this.size,                      
							  };
							  
							  
							  
                              this.getStaff(params);
                          }
                      }else{
                          this.$message.error(res.message);
                      }
                    }).catch(err=>{
                        errInfo.err(err);
                    })
              },
             
              handleCurrentChange(val){
                  console.log( val );
                  this.current = val;
                  let data ={
                        current:this.current,
                        size:this.size,
                        epId:this.value,
                  };
                  this.getStaff(data);
                  
              },
              handleSizeChange(val){
                  console.log( val );
                  this.size = val;
                  let data ={
                        current:this.current,
                        size:this.size,
                        epId:this.value,
                  };
                  this.getStaff(data);
              },
              getStaff(data){
                  api.staffLists(data).then(res=>{
                      if(res.success){                      
                          let data = res.data;
                          console.log(data);
                          this.total = data.total;
                          this.list = data.records;
                      }else{
                          this.$message.error(res.message);
                      }
                    }).catch(err=>{
                        errInfo.err(err);
                    })
              },
              getEnterprise(){                  
                  api.enterpriseLists().then(res=>{
                      if(res.success){                      
                          let data = res.data;
                          console.log(data);
                          this.options = data;
                      }else{
                          this.$message.error(res.message);
                      }
                    }).catch(err=>{
                        errInfo.err(err);
                    })
              },
          },
    };
</script>
<style lang="scss" scoped>
    .staffContainer {
        padding: 20px;
        padding-bottom: 200px;
    }
    .pagContainer {
        padding-top: 20px;
    }
    .subSelect {
        width: 300px;
        margin-bottom: 20px;
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
        justify-content: space-between;
        align-content: center;
        align-items: center;
    }
    .inputContainer {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
    }
    .btnEvery {
        margin-right: 20px;
    }

</style>

<style>
    @import url(../../../globalStyle/table.css); 
    .staffContainer .searchContent .searchEvery .el-input input {
        color: #000 !important;
    }
    .staffContainer .searchContent .el-input__inner {
        border-color: #854343 !important;
    }
</style>