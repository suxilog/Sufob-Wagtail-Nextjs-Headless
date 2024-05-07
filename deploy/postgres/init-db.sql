-- 创建扩展
CREATE EXTENSION IF NOT EXISTS zhparser;

-- 创建自定义的文本搜索配置
CREATE TEXT SEARCH CONFIGURATION chinese (PARSER = zhparser);

-- 映射到中文分词
ALTER TEXT SEARCH CONFIGURATION chinese ADD MAPPING FOR n,v,a,i,e,l WITH simple;
