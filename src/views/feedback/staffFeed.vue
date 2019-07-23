<template>
  <div class="staffFeedContainer">
      
<!--
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
		  
		  <div class="searchNameCon">
                  <el-input  v-model.trim="name" placeholder="姓名" clearable></el-input>
            </div>
		  
		  <div class="searchContent">
			  <div class="btnEvery">
					  <el-button type="primary"  @click="searchOn">搜索</el-button>
					</div>

				  <div class="btnEvery">
					  <el-button type="primary"  @click="resetSearch">重置</el-button>
					</div>
		  </div>
          
      </div>
-->
      

      

        
      <div class="tableCon">
                <el-table  :data="list"  border fit highlight-current-row style="width: 99%" stripe>
                  

                  <el-table-column align="center" label="用户名" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.name}} </span>
                    </template>
                  </el-table-column>
                   <el-table-column align="center" label="反馈时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.gmtCreate}} </span>
                    </template>
                  </el-table-column>
                    <el-table-column align="center" label="反馈类型" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.type.message}} </span>
                    </template>
                  </el-table-column>
                   
					
					<el-table-column align="center" label="操作" width="200">
						<template slot-scope="scope">
						  <el-button  size="small" type="success" @click="checkDetail(scope.row)">查看
						  </el-button>

						</template>
					  </el-table-column>
				
                </el-table>          
        </div>

        <div class="pagContainer">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="current" :page-sizes="[10,20,30, 50]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>



	<el-dialog title="反馈详情" :visible.sync="dialogTableVisible">
	  <div class="content">
		  <el-form :model="form" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="用户名">
			<el-input v-model="form.userName" disabled></el-input>
		  </el-form-item>
		  <el-form-item label="反馈时间">
			<el-input v-model="form.gmtCreate" disabled></el-input>
		  </el-form-item>
		  <el-form-item label="反馈类型">
			<el-input v-model="form.type" disabled></el-input>
		  </el-form-item>
		  <el-form-item label="反馈内容">
			<el-input type="textarea" v-model="form.desc" disabled></el-input>
		  </el-form-item>
		  </el-form>
		  <div class="" v-for="(img,index) in imgArr">
			  <img :src="img" class="preImg">
		  </div>
		  
		  
	  </div>
	</el-dialog>




      
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
				name:'',
                options:[],
                dialogTableVisible:false,
				form:{
					type:'',
					gmtCreate:'',
					userName:'',
					desc:'',
				},
				imgArr:[],
           

            }
        },
        mounted(){
            this.initQuery();
        },
        methods:{
			checkDetail(row){
				console.log(row.id);
				this.dialogTableVisible = true;
				this.imgArr =[];
				let params = {
					id:row.id
				};
				api.queryFeedbackDetail(params).then(res=>{
					console.log(res);
					if(res.success){
						
						this.form = {
							type: res.data.type.message ? res.data.type.message: '',
							gmtCreate:res.data.gmtCreate ? res.data.gmtCreate: '',
							userName:res.data.name ? res.data.name: '',
							desc:res.data.description ? res.data.description: '',
						};
						console.log( JSON.parse(res.data.img) );
						this.imgArr = JSON.parse(res.data.img);
						
					} else{
						this.$message.error(res.message);
					}
				}).catch(err=>{
					errInfo.err(err);
				})
				
				
				
			},
            searchOn (){
              
                
            },
            resetSearch (){      
                this.name = '';
               
            },
           
            initQuery(){
                api.queryUserFeedback().then(res=>{                       
                        if(res.success){                    
                            let data = res.data;
                            console.log(data);
							this.current = data.current;
							this.total = data.total;
							this.list = data.records;
                        }else{
                            this.$message.error( res.message );
                        }
                    }).catch(err=>{
                        errInfo.err(err);
                    })  
            },
            startQuery(){
                console.log(this.value);  
              
            },
            getMutipleAmount(params){
                api.queryUserFeedback(params).then(res=>{
                    if(res.success){
                        let data = res.data;
                        console.log( 'data',data );  
                        this.current = data.current;
							this.total = data.total;
							this.list = data.records;
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
                };
                this.getMutipleAmount(params);
            },
            handleCurrentChange(val){
                this.current = val;
                let params = {
                    current:this.current,
                    size:this.size,
                };
                this.getMutipleAmount(params);
            },
        }

    }
</script>

<style lang="scss" scoped>
    .staffFeedContainer {
        padding: 20px;
        padding-bottom: 200px;
    }    
	.selectContainer {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
	}
	.preImg {
		width: 100%;
	}
	
	
    .subSelect {
        width: 300px;
        margin-bottom: 20px;
    }
    .pagContainer {        
        padding-top: 20px;  
    }
	
     .searchNameCon {
        width: 200px;
        margin-right: 20px;
		margin-bottom: 20px;
		 margin-left: 20px;
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
  
    .btnEvery {
        margin-right: 20px;
    }
</style>
<style>
    @import url(../../globalStyle/table.css); 
    .staffFeedContainer .searchContent .searchEvery .el-input input {
        color: #000 !important;
    }
    .staffFeedContainer .searchContent .el-input__inner {
        border-color: #854343 !important;
    }
</style>