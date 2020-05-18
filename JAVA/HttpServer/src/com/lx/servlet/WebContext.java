package com.lx.servlet;

import java.lang.reflect.Parameter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// 处理数据
public class WebContext {

    private List<Entity> entities = null;
    private List<Mapping> mappings = null;

    // key:servlet-name   value:servlet-class
    private Map<String, String> entityMap = new HashMap<String, String>();
    // key:url-pattern    value:servlet-name
    private Map<String, String> mappingMap = new HashMap<String, String>();

    // 构造函数
    public WebContext(List<Entity> entities, List<Mapping> mappings) {
        this.entities = entities;
        this.mappings = mappings;

        for (Entity e:this.entities) {
            entityMap.put(e.getName(), e.getClz());
        }

        for (Mapping m:mappings) {
            for (String p:m.getPartterns()) {
                mappingMap.put(p, m.getName());
            }
        }
    }

    // 通过url路径 -> Clz
    public String getClz(String pattern) {
        String name = mappingMap.get(pattern);
        return entityMap.get(name);
    }
}
