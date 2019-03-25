insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('fieldmanager_list', '管理', 'm_index', '', '/system/fieldManager/list', 1, 1);
insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('fieldmanager_add', '新增', 'fieldmanager_list', null, '/system/fieldManager/add', 0,1 );
insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('fieldmanager_edit', '修改', 'fieldmanager_list', null, '/system/fieldManager/edit', 0, 1);
insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('fieldmanager_del', '删除', 'fieldmanager_list', null, '/system/fieldManager/del', 0, 1);
insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('fieldmanager_batchDel', '批量删除', 'fieldmanager_list', null, '/system/fieldManager/batchDel', 0, 1);

--以下代码复制到all.sql中
#namespace("fieldManager")
#include("system/fieldManager.sql")
#end
--以上代码复制到all.sql中

--复制到SystemRoutes中
add("/system/fieldManager", FieldManagerController.class,"/system/fieldmanager"); 

