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
      <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.username">
      </el-input>
      <el-button class="filter-item" type="primary"  icon="search" @click="handleFilter">搜索</el-button>
      <el-button v-if="sys_user_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button> -->
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 99%" stripe>
      <el-table-column align="center" :label="$t('table.id')">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.accountName')">
        <template slot-scope="scope">
          <span>
            <img v-if="scope.row.avatar" class="user-avatar" style="width: 20px; height: 20px; border-radius: 50%;" :src="scope.row.avatar+'?imageView2/1/w/20/h/20'"> {{scope.row.username}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属部门" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.deptName}} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          <span v-for="role in scope.row.roleList">{{role.name}} </span>
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
          <el-button v-if="sys_user_edit" size="small" type="success" @click="handleUpdate(scope.row)">管理
          </el-button>
          <el-button v-if="sys_user_del" size="small" type="danger" @click="deletes(scope.row)">{{$t('button.forbidden')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogDeptVisible">
      <el-tree class="filter-tree" :data="treeDeptData" :default-checked-keys="checkedKeys" check-strictly node-key="id" highlight-current ref="deptTree" :props="defaultProps" @node-click="getNodeData" default-expand-all>
      </el-tree>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输用户名"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'create'" label="密码" placeholder="请输入密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="deptName">
          <el-input v-model="form.deptName" placeholder="选择部门" @focus="handleDept()" readonly></el-input>
          <input type="hidden" v-model="form.deptId" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select class="filter-item" v-model="role" placeholder="请选择">
            <el-option v-for="item in rolesOptions" :key="item.id" :label="item.name" :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="验证码登录使用"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-if="dialogStatus == 'update' && sys_user_del " prop="enabled">
          <el-select class="filter-item" v-model="form.enabled" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item" :label="item | statusFilter" :value="item"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, getObj, addObj, putObj, delObj } from "@/api/user";
import { deptRoleList, fetchDeptTree } from "@/api/role";
import { mapGetters } from "vuex";
	
	import errInfo from '@/api/errInfo'
    
export default {  
  data() {
    return {
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
        page: 1,
        limit: 20
      },
      role: [],
      form: {
        username: undefined,
        password: undefined,
        delFlag: undefined,
        deptId: undefined,
        mobile: undefined
      },
      rules: {
        username: [{
            required: true,
            message: "请输入账户",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          }
        ],
        password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur"
          }
        ],
        deptId: [
          {
            required: true,
            message: "请选择部门",
            trigger: "blur"
          }
        ],
        role: [
          {
            required: true,
            message: "请选择角色",
            trigger: "blur"
          }
        ],mobile: [
          {
            required: true,
            message: "手机号",
            trigger: "blur"
          },
          {
            min: 11,
            max: 11,
            message: "长度在11 个字符",
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
    this.getList();
    this.sys_user_add = this.permissions["6"];
    this.sys_user_edit = this.permissions["7"];
    this.sys_user_del = this.permissions["8"];
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.listQuery.orderByField = "`user`.gmt_create";
      this.listQuery.isAsc = false;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
      }).catch(err=>{
		  errInfo.err(err);
	  });
    },
    getNodeData(data) {
      this.dialogDeptVisible = false;
      this.form.deptId = data.id;
      this.form.deptName = data.name;
      deptRoleList(data.id).then(response => {
        this.rolesOptions = response.data.records;
      }).catch(err=>{
		  errInfo.err(err);
	  });
    },
    handleDept() {
      fetchDeptTree().then(response => {
        this.treeDeptData = response.data;
        this.dialogDeptVisible = true;
      }).catch(err=>{
		  errInfo.err(err);
	  });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
        
        deptRoleList().then(res => {
          this.rolesOptions = res.data.records;
        }).catch(err=>{
            errInfo.err(err);
        });
    },
    handleUpdate(row) {
        console.log(row);
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
              
        if(row.roleList.length){
           this.role=row.roleList[0].id;
        }
        
        deptRoleList().then(res => {
          this.rolesOptions = res.data.records;
        }).catch(err=>{
            errInfo.err(err);
        });
        this.form = {
            enabled:row.enabled,
            username:row.username,
            deptName:row.deptName,
            mobile:row.mobile,
            id:row.id
        };
    },
    create(formName) {
      const set = this.$refs;
      this.form.role = this.role;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
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
          this.form.password = undefined;
          this.form.roleList = undefined;
          putObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "修改成功",
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
    deletes(row) {
      this.$confirm(
        "此操作将永久删除该用户(用户名:" + row.username + "), 是否继续?",
        "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        delObj(row.id)
          .then(() => {
            this.getList();
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000
            });
          })
          .cache(() => {
            this.$notify({
              title: "失败",
              message: "删除失败",
              type: "error",
              duration: 2000
            });
          });
      });
    },
    resetTemp() {
      this.form = {
        id: undefined,
        username: "",
        password: "",
        role: [],
        delFlag: "",
        deptId: "",
        mobile: ""
      };
    }
  }
};

</script>
<style>
      @import url(../../../globalStyle/table.css);
</style>
<style lang="scss" scoped>
	.app-container {
		padding-bottom: 150px;
	}
</style>
