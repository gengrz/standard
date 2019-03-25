insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('fieldclass_list', '管理', 'm_index', '', '/system/fieldClass/list', 1, 1);
insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('fieldclass_add', '新增', 'fieldclass_list', null, '/system/fieldClass/add', 0,1 );
insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('fieldclass_edit', '修改', 'fieldclass_list', null, '/system/fieldClass/edit', 0, 1);
insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('fieldclass_del', '删除', 'fieldclass_list', null, '/system/fieldClass/del', 0, 1);
insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('fieldclass_batchDel', '批量删除', 'fieldclass_list', null, '/system/fieldClass/batchDel', 0, 1);

--以下代码复制到all.sql中
#namespace("fieldClass")
#include("system/fieldClass.sql")
#end
--以上代码复制到all.sql中

--复制到SystemRoutes中
add("/system/fieldClass", FieldClassController.class,"/system/fieldclass"); 

