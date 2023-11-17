-- 用户表
CREATE TABLE `t_user` IF NOT EXISTS (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `deleted` tinyint(4) unsigned zerofill NOT NULL DEFAULT '0' COMMENT '是否删除，默认否',
	`user_id` varchar(50) NOT NULL DEFAULT '' COMMENT '用户ID',
	`username` varchar(50) NOT NULL DEFAULT '' COMMENT '用户名',
	`password` varchar(50) NOT NULL DEFAULT '' COMMENT '密码', 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


