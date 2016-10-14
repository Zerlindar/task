org.configMgr = function () {
  var me = this;
  me.init = function () {
    me.initOrgConfigGrid();
    $("#btnSearch").click(me.search);
  };

  me.initOrgConfigGrid = function () {
    $("#orgConfigGrid").datagrid({
      url: AppHelper.Url.getManageUrl(org.MODULE_CONFIG + "/list", {}),
      loadMsg: "数据加载中请稍候",
      striped: true,
      pagination: true,
      rownumbers: true,
      singleSelect: true,
      height: '100%',
      pageSize: 20,
      columns: [[
        {field: "id", title: "主键", hidden: true},
        {field: "code", title: "code", hidden: true},
        {field: "sdText", title: "功能名称", width: 150},
        {field: "description", title: "功能描述", width: 150},
        {field: "value", title: "状态/值", width: 150, formatter: me.formatterValue},
        {field: "enabled", title: "是否启用", width: "100", formatter: me.formatterEnabled},
        {field: 'op', title: '操作', width: 150, formatter: me.opFormatter}
      ]],
      onLoadSuccess: function (data) {
        //内容过长处理
        $('#orgConfigGrid').datagrid('doCellTip', {
          delay: 500,
          maxWidth: 400,
          onlyShowInterrupt: true
        });
      },
      queryParams: {
        orgId: $("#orgId").val(),
        sdType: $("#sdType").val()
      }
    })
  };

  me.formatterValue = function (value, row, index) {
    if (row.code == 'EXAM_RANK') {
      if (value == '1') {
        return "开启";
      } else if (value == '0' || value == null) {
        return "关闭"
      }
    } else {
      return value;
    }
  };

  me.formatterEnabled = function (value, row, index) {
    if (row.code == 'EXAM_RANK') {
      return "是";
    } else {
      if (value == '1') {
        return "是";
      } else if (value == '0') {
        return "否";
      }
    }
  };


  me.opFormatter = function (value, row, index) {
    var result = '';
    if (row.code == 'EXAM_RANK') {
      if (row.value == '0' || row.value == '' || row.value == null) {
        var btn1 = "<a class=\"gridBtn\" onclick=\"orgConfigMgr.startUsing(\'" + row.code + "\')\" href=\"#\" class=\"easyui-textbox\" data-options=\"iconCls:\'icon-search\'\">开启</a>";
      } else if (row.value == '1') {
        var btn1 = "<a class=\"gridBtn\" onclick=\"orgConfigMgr.stopUsing(\'" + row.id + "\')\" href=\"#\" class=\"easyui-textbox\" data-options=\"iconCls:\'icon-search\'\">关闭</a>";
      }
      result = btn1;
    }
    else {
      if (row.enabled == 1) {
        var btn1 = "<a class=\"gridBtn\" onclick=\"orgConfigMgr.stopEnabled(\'" + row.id + "\')\" href=\"#\" class=\"easyui-textbox\" data-options=\"iconCls:\'icon-search\'\">禁用</a>&nbsp";
        var btn2 = "<a class=\"gridBtn\" onclick=\"orgConfigMgr.editOrgConfig(\'" + row.code + "\', \'" + row.value + "\')\" href=\"#\" class=\"easyui-textbox\" data-options=\"iconCls:\'icon-search\'\">编辑</a>";
      } else if (row.enabled == '0' || row.enabled == '' || row.enabled == null) {
        var btn1 = "<a class=\"gridBtn\" onclick=\"orgConfigMgr.startEnabled(\'" + row.id + "\', \'" + row.value + "\')\" href=\"#\" class=\"easyui-textbox\" data-options=\"iconCls:\'icon-search\'\">启用</a>&nbsp";
        var btn2 = "<a class=\"gridBtn\" onclick=\"orgConfigMgr.editOrgConfig(\'" + row.code + "\', \'" + row.value + "\')\" href=\"#\" class=\"easyui-textbox\" data-options=\"iconCls:\'icon-search\'\">编辑</a>&nbsp";
      }
      result = btn1 + btn2;
    }
    return result;
  };

  me.startUsing = function (code) {
    $.messager.confirm("提示", "确定要开启吗?", function (r) {
      if (r) {
        $.ajax({
          url: AppHelper.Url.getManageUrl(org.MODULE_CONFIG + "/toStartUsing", {
            orgId: $("#orgId").val(),
            code: code
          }),
          type: "POST",
          success: function (data, textStatus) {
            AppHelper.Ajax.defaultResult(data, textStatus);
            me.search();
          },
          error: function (data, textStatus, e) {
            $.messager.alert("错误", e.message);
          }
        })
      }

    })
  };

  me.stopUsing = function (id) {
    $.messager.confirm("提示", "确定要关闭吗？", function (r) {
      if (r) {
        $.ajax({
          url: AppHelper.Url.getManageUrl(org.MODULE_CONFIG + "/toStopUsing", {
            id: id
          }),
          type: "POST",
          success: function (data, textStatus) {
            AppHelper.Ajax.defaultResult(data, textStatus);
            me.search();
          },
          error: function (data, textStatus, e) {
            $.messager.alert("错误", e.message);
          }
        })
      }
    })
  };


  /**
   * 编辑value
   */
  me.editOrgConfig = function (code, value) {
    var url = AppHelper.Url.getManageUrl(org.MODULE_CONFIG + "/to-edit", {
      code: code,
      orgId: $("#orgId").val(),
      value: value
    });
    $("#detailWindow").window({
      title: "编辑企业功能",
      width: "80%",
      height: "60%",
      content: AppHelper.Iframe.create(url),
      onClose: me.search
    })
  };

  /**
   * 启用
   */
  me.startEnabled = function (id, value) {
    if (value == "null" || value == '' || value == null) {
      $.messager.alert("提示", "请先点击编辑按钮，编辑value值");
      return;
    }
    $.messager.confirm("提示", "确定要启用吗？", function (r) {
      if (r) {
        $.ajax({
          url: AppHelper.Url.getManageUrl(org.MODULE_CONFIG + "/toStartEnabled", {
            id: id
          }),
          type: "POST",
          success: function (data, textStatus) {
            AppHelper.Ajax.defaultResult(data, textStatus);
            me.search();
          },
          error: function (data, textStatus, e) {
            $.messager.alert("错误", e.message);
          }
        })
      }
    })
  };


  /**
   * 禁用
   */
  me.stopEnabled = function (id) {
    $.messager.confirm("提示", "确定要禁用吗？", function (r) {
      if (r) {
        $.ajax({
          url: AppHelper.Url.getManageUrl(org.MODULE_CONFIG + "/toStopEnabled", {
            id: id
          }),
          type: "POST",
          success: function (data, textStatus) {
            AppHelper.Ajax.defaultResult(data, textStatus);
            me.search();
          },
          error: function (data, textStatus, e) {
            $.messager.alert("错误", e.message);
          }
        })
      }
    })
  };


  /**
   * 查询按钮
   */
  me.search = function () {
    $("#orgConfigGrid").datagrid("reload",
      AppHelper.Form.serialize("#formOrgConfigList"));
  };
  return me;
};

org.configEdit = function () {
  var me = this;
  me.init = function () {
    $("#btnSave").click(me.submitForm);
    me.setComp();
  };

  me.setComp = function () {
    if ($("#value").val() == 'null') {
      $("#value").textbox("setValue", '');
    }
  };

  me.submitForm = function () {
    if ($("#formOrgConfigEdit").form("validate")) {
      $.ajax({
        url: AppHelper.Url.getManageUrl(org.MODULE_CONFIG + "/editValue", {}),
        type: "POST",
        data: $("#formOrgConfigEdit").serialize(),
        success: function (data, textStatus) {
          AppHelper.Ajax.defaultResult(data, textStatus, function () {
            easyuiExt.Win.closeWin();
          });
        },
        error: function (data, textStatus, e) {
          AppHelper.Ajax.defaultResult(data, textStatus, null, e);
        }
      })
    }
  }
  return me;
};
