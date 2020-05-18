package com.lx.servlet;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

/*
 * 熟悉SAX解析流程
 */
public class XMLParse {

    public static void main(String[] args) throws Exception {
        // SAX解析
        // 1.获取解析工厂
        SAXParserFactory factory = SAXParserFactory.newInstance();
        // 2.从解析工厂获取解析器
        SAXParser mParse = factory.newSAXParser();
        // 3.编写处理器

        // 4.加载文档Document注册处理器
        WebHandler handler = new WebHandler();

        // 5.解析
        mParse.parse(Thread.currentThread().getContextClassLoader().getResourceAsStream("com/lx/servlet/web.xml"), handler);

        // 6.获取解析得到的数据
        List<Entity> entitys = handler.getEntitys();
        List<Mapping> mappings = handler.getMappings();
        for (Entity e:entitys) {
            System.out.println(" ==解析完成 输出== \n" + e.getName() + e.getClz());
        }
        for (Mapping m:mappings) {
            System.out.println(" ==解析完成 输出== \n" + m.getName() + m.getPartterns());
        }

        WebContext context = new WebContext(handler.getEntitys(), handler.getMappings());
        // 通过pattern获取类
        String className = context.getClz("/lg");
        // 反射 得到类对象
        Class clz = Class.forName(className);
        Servlet servlet = (Servlet)clz.getConstructor().newInstance();
        servlet.service();
    }
}

class WebHandler extends DefaultHandler {
    // 成员变量
    private List<Entity> entitys;
    private List<Mapping> mappings;

    private Entity entity;
    private Mapping mapping;

    private String tag;  //当前操作标签

    private String tagString; // 『servlet』、『servlet-mapping』

    // 获取数据
    public List<Entity> getEntitys() {
        return entitys;
    }

    public List<Mapping> getMappings() {
        return mappings;
    }

    @Override
    public void startDocument() throws SAXException {
        super.startDocument();
        // 1.初始化
        entitys = new ArrayList<Entity>();
        mappings = new ArrayList<Mapping>();
    }

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        super.startElement(uri, localName, qName, attributes);
//        System.out.println("qName 解析开始 = "+qName);

        if (null != qName){
            tag = qName;
            if (tag.equals("servlet")) {
                // 取值时初始化
                entity = new Entity();
                tagString = "servlet";
            } else if (tag.equals("servlet-mapping")) {
                mapping = new Mapping();
                tagString = "servlet-mapping";
            }
        }
    }

    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        super.characters(ch, start, length);
        String contens = new String(ch, start, length).trim();

        if (null != tag) {  // 处理空数据
            if (null != tagString) {  // 区分不同子标签
                if (tagString.equals("servlet")) {  // 操作servlet标签
                    if (tag.equals("servlet-name")) {
                        entity.setName(contens);
                    } else if (tag.equals("servlet-class")) {
                        entity.setClz(contens);
                    }
                } else if (tagString.equals("servlet-mapping")) { // 操作servlet-mapping标签
                    if (tag.equals("servlet-name")) {
                        mapping.setName(contens);
                    } else if (tag.equals("url-pattern")) {
                        mapping.addPatterns(contens);
                    }
                }
            }
        }
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        super.endElement(uri, localName, qName);
//        System.out.println("qName 解析结束 = "+qName);

        // 3.将数据放到数组中
        if (null != qName) {
            if (qName.equals("servlet")) {
                entitys.add(entity);
            } else if (qName.equals("servlet-mapping")) {
                mappings.add(mapping);
            }
        }
        // 处理完置为null，避免</name>后的空数据
        tag = null;
    }

    @Override
    public void endDocument() throws SAXException {
        super.endDocument();

//        System.out.println("解析文档结束");
    }
}
