<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input @keyup.enter.native="handleFilter" v-model="listQuery.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="handleFilter">{{$t('button.search')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="handleCreate">{{$t('button.add')}}</el-button>
        </el-form-item>
      </el-form>  
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 99%" stripe>
      <el-table-column align="center" :label="$t('table.id')">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

    <el-table-column align="center" label="公司图标">
        <template slot-scope="scope">          
            <img v-if="scope.row.logo" class="user-avatar" style="width: 20px; height: 20px; border-radius: 50%;" :src="scope.row.logo+'?imageView2/1/w/20/h/20'">
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司名称">
        <template slot-scope="scope">
          <span>
             {{scope.row.name}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司规模" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.scale}} 人</span>
        </template>
      </el-table-column>
	
	<el-table-column align="center" label="实际人数" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.actualScale}} 人</span>
        </template>
      </el-table-column>
	<el-table-column align="center" label="留存金额" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.totalAvailable}} 元</span>
        </template>
      </el-table-column>
	<el-table-column align="center" label="留存率" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ ( (scope.row.retainedProfits)*100).toFixed(2)  }}% </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="信用代码" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.businessLicence}} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.gmtCreate}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" class-name="status-col" label="状态">
        <template slot-scope="scope">
          <el-tag>{{scope.row.enabled | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-if="sys_user_check" size="small" type="success" @click="handleUpdate(scope.row)">管理
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.current" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item class="enterpriseInfo-logo" label="公司LOGO" prop="logo">
            
            
            <input type="file" ref="logo"  accept="image/x-png,image/jpeg" @change="uploadLogo">

          <img v-if="form.logo" :src="form.logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-form-item>
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="公司英文名称" prop="enName">
          <el-input v-model="form.enName" placeholder="请输入公司英文名称"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入公司地址"></el-input>
        </el-form-item>
        <el-form-item label="员工上限" prop="scale">
          <el-select class="filter-item" v-model="form.scale" placeholder="请选择公司规模">
            <el-option label="100人" value="100"></el-option>
            <el-option label="200人" value="200"></el-option>
            <el-option label="300人" value="300"></el-option>
            <el-option label="400人" value="400"></el-option>
            <el-option label="500人" value="500"></el-option>
            <el-option label="600人" value="600"></el-option>
              <el-option label="700人" value="700"></el-option>
            <el-option label="800人" value="800"></el-option>
              <el-option label="900人" value="900"></el-option>
              <el-option label="1000人" value="1000"></el-option>
              <el-option label="1000人以上" value="1001"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="businessLicence">
          <el-input v-model="form.businessLicence" placeholder="请输入统一社会信用代码"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="form.contacts" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="企业邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入企业邮箱"></el-input>
        </el-form-item>
        <el-form-item label="行业" prop="enterpriseType">
          <el-select class="filter-item" v-model="form.enterpriseType" placeholder="请选择行业">
            <el-option label="互联网科技" value="互联网科技"></el-option>
            <el-option label="医疗器械" value="医疗器械"></el-option>
            <el-option label="本地生活" value="本地生活"></el-option>
            <el-option label="广告文化" value="广告文化"></el-option>
            <el-option label="游戏" value="游戏"></el-option>
            <el-option label="餐饮" value="餐饮"></el-option>
            <el-option label="金融服务" value="金融服务"></el-option>
            <el-option label="商贸" value="商贸"></el-option>
            <el-option label="电影休闲娱乐" value="电影休闲娱乐"></el-option>
            <el-option label="职业人才中介" value="职业人才中介"></el-option>
            <el-option label="注册进出口公司类公司" value="注册进出口公司类公司"></el-option>
            <el-option label="建筑" value="建筑"></el-option>
            <el-option label="旅游" value="旅游"></el-option>
            <el-option label="教育" value="教育"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="服务期限" prop="time">
              
              <el-date-picker v-model="form.time"  type="daterange"  align="left"  unlink-panels  format="yyyy-MM-dd"  value-format="yyyy-MM-dd"  range-separator="至"  start-placeholder="开始日期"  end-placeholder="结束日期" :picker-options="pickerOptions2"  @change = "getTime" @blur="dateBlur">
             </el-date-picker>
              
              
            </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-if="sys_user_edit" type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import { fetchList, getObj, addObj, putObj, delObj } from "@/api/enterprise";
import { mapGetters } from "vuex";
    import api from '@/api/reqApi';
    import qs from 'qs'
    import errInfo from '@/api/errInfo'

export default {
  data() {
    return {
        value5:'',
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
      treeDeptData: [],
      checkedKeys: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        current: 1,
        size: 10
      },
      role: [],
      form: {
        logo: undefined,
        name: undefined,
        enName: undefined,
        address: undefined,
        scale: undefined,
        businessLicence: undefined,
        contacts: undefined,
        mobile: undefined,
        email: undefined,
        enterpriseType: undefined,
          time:''
      },
      rules: {
        name: [{
            required: true,
            message: "请输入账户",
            trigger: "blur"
          }
        ],
          scale:[{
            required: true,
            message: "请选择员工上限",
            trigger: "blur"
          }
        ],
          time: [{
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        address: [{
            required: true,
            message: "请输入企业地址",
            trigger: "blur"
          }
        ],
        email: [{
            required: true,
            message: "请输入企业邮箱",
            trigger: "blur"
          },
          {
            min: 4,
            max: 32,
            message: "长度在 4 到 32 个字符",
            trigger: "blur"
          }
        ],
        businessLicence: [{
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur"
          },
          {
            min: 18,            
            message: "长度不小于18 个字符",
            trigger: "blur"
          }
        ],
          mobile:[
              { required: true,message: "请输入电话",trigger: "blur"},
              { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
          ],
        contacts: [{
            required: true,
            message: "请输入联系人",
            trigger: "blur"
          }
        ]
      },
      statusOptions: ["0", "1"],
      rolesOptions: [],
      dialogFormVisible: false,
      dialogDeptVisible: false,
      userAdd: false,
      userUpd: false,
      userDel: false,
      dialogStatus: "",
        sys_user_add:'',
        sys_user_edit:'',
        sys_user_check:'',
      textMap: {
        update: "编辑",
        create: "创建"
      },
      isDisabled: {
        0: false,
        1: true
      },
      tableKey: 0
    };
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "无效",
        1: "有效",
        9: "锁定"
      };
      return statusMap[status];
    }
  },
  created() {
	  let params = {
        size:this.listQuery.size,
        current: this.listQuery.current
      };
    this.getList(params);
    this.sys_user_add = this.permissions["22"];
    this.sys_user_edit = this.permissions["20"];
    this.sys_user_check = this.permissions["21"];
  },
  methods: {
      getTime(){
          
      },
      dateBlur(){
      console.log(this.form.time);
        },
      uploadLogo(){
                let tar = this.$refs.logo;
                if( (tar.files[0].type=="image/jpeg") || (tar.files[0].type=="image/png") ){
                    if(  tar.files[0].size/1024/1024 > 1  ){
                       this.$message.error('图片大小不超过1M。');
                        tar.value = '';
                    }else {
                        let fd = new FormData();
                        fd.append('file',tar.files[0]);
                       api.modifiedEnterpriseLogo(fd).then(res=>{
                           if(res.success){
                               this.form.logo = res.data;
                               tar.value = '';
                               this.$message({
                                  message: '上传成功。',
                                  type: 'success'
                                });
                           }else{
                               this.$message.error(res.message);
                           }
                       }).catch(err=>{
							  errInfo.err(err);
						})						
                    }
                }else {
                    tar.value = '';
                    this.$message.error('只支持jpg，png');
                }
            },
    getList(params) {
      this.listLoading = true;     
      fetchList(params).then(response => {
        this.list = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
      }).catch(err=>{
		  errInfo.err(err);
	  });
    },
    handleFilter() {
      this.listQuery.page = 1;
      let params = {
        size:this.listQuery.size,
        current: this.listQuery.current
      };
    this.getList(params); 
    },
    handleAvatarSuccess(res, file) {
      this.form.logo = URL.createObjectURL(file.raw);
    },
    
    handleSizeChange(val) {
      this.listQuery.size = val;
		console.log(val);
      let params = {
        size:this.listQuery.size,
        current: this.listQuery.current
      };
		
		console.log(params);
    this.getList(params); 
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      let params = {
        size:this.listQuery.size,
        current: this.listQuery.current
      };
    this.getList(params); 
    },
    handleCreate() {
      	this.resetTemp();
      	this.dialogStatus = "create";
      	this.dialogFormVisible = true;
        this.sys_user_edit = false;
    },
    handleUpdate(row) {
        getObj(row.id).then(res=>{
            if(res.success){
                this.dialogFormVisible = true;
                this.dialogStatus = "update";
				this.sys_user_edit = true;
                let data = res.data;
                this.data = data;
                this.form = {
                    id:data.id,
                    logo: data.logo ? data.logo : '',
                    name: data.name ? data.name : '',
                    enName: data.enName ? data.enName : '',
                    address: data.address ? data.address : '',
                    scale: data.scale ? data.scale : '',
                    businessLicence: data.businessLicence ? data.businessLicence : '',
                    contacts: data.contacts ? data.contacts : '',
                    mobile: data.mobile ? data.mobile : '',
                    email: data.email ? data.email : '',
                    enterpriseType: data.enterpriseType ? data.enterpriseType : '',
                    time:[ data.startTime.split(' ')[0],data.endTime.split(' ')[0] ],
                };
            }else{
                this.$message.error(res.message);
            }
        }).catch(err=>{
            errInfo.err(err);
        })
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
            let data = {
                address:this.form.address,
                businessLicence:this.form.businessLicence,
                contacts:this.form.contacts,
                email:this.form.email,
                enName:this.form.enName,
                enterpriseType:this.form.enterpriseType,
                logo:this.form.logo,
                name:this.form.name,
                mobile:this.form.mobile,
                scale:this.form.scale,
                startTime:this.form.time[0],
                endTime:this.form.time[1]                
            };
          addObj(qs.stringify(data) ).then(() => {
            this.dialogFormVisible = false;
			 let params = {
				size:this.listQuery.size,
				current: this.listQuery.current
			  };
			this.getList(params); 
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          }).catch(err=>{
			  errInfo.err(err);
		  });
            
            
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      this.form.role = this.role;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false; 
            let data = {
                id:this.form.id,
              address:this.form.address,
              businessLicence:this.form.businessLicence,
              contacts:this.form.contacts,
              email:this.form.email,
              enName:this.form.enName,
              enabled:this.form.enabled,
              enterpriseType:this.form.enterpriseType,
              id:this.form.id,
              logo:this.form.logo,
              mobile:this.form.mobile,
              name:this.form.name,
              phone:this.form.phone,
              role:this.form.role,
              scale:this.form.scale,
              status:this.form.status,
              unicode:this.form.unicode,
                startTime:this.form.time[0],
                endTime:this.form.time[1]  
            };

            
            putObj(data).then(res=>{
                if(res.success){
                    this.dialogFormVisible = false;
					let params = {
						size:this.listQuery.size,
						current: this.listQuery.current
					  };
					this.getList(params);
                    this.$notify({
                      title: "成功",
                      message: "修改成功",
                      type: "success",
                      duration: 2000
                    });
                }else{
                    this.$message.error('修改失败。');
                }
            }).catch(err=>{
                errInfo.err(err);
            })
        } else {
          return false;
        }
      });
    },   
    resetTemp() {
      this.form = {
            id: undefined,
            logo: "",
            name: "",
            enName: "",
            address: "",
            scale: "",
            businessLicence: "",
            contacts: "",
            phone: "",
            email: "",
            enterpriseType: "",
            time:'',
      };
    }
  }
};

</script>
<style lang="scss">
	
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
    .enterpriseInfo-logo {
        input {
            position: absolute;
            left: 0;
            top: 0;
            height: 130px;
            width: 130px;
            font-size: 0;
            opacity: 0;
            cursor: pointer;
        }
    }
    .user-avatar {
        width: 30px !important;
        height: 30px !important;
    }
</style>
<style>
      @import url(../../../globalStyle/table.css);
</style>
<style lang="scss" scoped>
	.app-container {
		padding-bottom: 150px;
	}
</style>
