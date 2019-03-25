insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('#(tableName)_list', '#(tablemeta.remarks??tableName)管理', 'm_index', '', '/system/#(classNameSmall)/list', 1, 1);
insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('#(tableName)_add', '新增', '#(tableName)_list', null, '/system/#(classNameSmall)/add', 0,1 );
insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('#(tableName)_edit', '修改', '#(tableName)_list', null, '/system/#(classNameSmall)/edit', 0, 1);
insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('#(tableName)_del', '删除', '#(tableName)_list', null, '/system/#(classNameSmall)/del', 0, 1);
insert into t_menu (id, name, pid, description, pageurl, menuType, active) values ('#(tableName)_batchDel', '批量删除', '#(tableName)_list', null, '/system/#(classNameSmall)/batchDel', 0, 1);

--以下代码复制到all.sql中
#[[#]]#namespace("#(classNameSmall)")
#[[#]]#include("#(basePath)/#(classNameSmall).sql")
#[[#]]#end
--以上代码复制到all.sql中

--复制到SystemRoutes中
add("/#(basePath)/#(classNameSmall)", #(className)Controller.class,"/#(basePath)/#(classNameLower)"); 

#(tablemeta.remarks??tableName)