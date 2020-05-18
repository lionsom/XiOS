package com.lx.server.basic;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/*
 * 熟悉SAX解析流程
 */
public class XMLPerson {

    public static void main(String[] args) throws ParserConfigurationException, SAXException, IOException {
        // SAX解析
        // 1.获取解析工厂
        SAXParserFactory factory = SAXParserFactory.newInstance();
        // 2.从解析工厂获取解析器
        SAXParser mParse = factory.newSAXParser();
        // 3.编写处理器

        // 4.加载文档Document注册处理器
        PersonHandler handler = new PersonHandler();

        // 5.解析
        mParse.parse(Thread.currentThread().getContextClassLoader().getResourceAsStream("com/lx/server/basic/person.xml"), handler);

        // 6.获取解析得到的数据
        List<Person> persons = handler.getPersons();
        for (Person p:persons) {
            System.out.println(" ==解析完成 输出== \n" + p.getName() + p.getAge());
        }
    }
}

class PersonHandler extends DefaultHandler {
    // 成员变量
    private List<Person> persons;
    private Person person;
    private String tag;     // 当前操作的标签名

    // 获取数据
    public List<Person> getPersons() {
        return this.persons;
    }

    @Override
    public void startDocument() throws SAXException {
        super.startDocument();
//        System.out.println("解析文档开始");

        // 1.初始化
        persons = new ArrayList<Person>();

    }

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        super.startElement(uri, localName, qName, attributes);
//        System.out.println("qName 解析开始 = "+qName);

        if (null != qName){
            tag = qName;
            if (tag.equals( "person")) {
                // 取值时初始化
                person = new Person();

            }
        }
    }

    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        super.characters(ch, start, length);
        String contens = new String(ch, start, length).trim();

        if (null != tag) {  // 处理空数据
            if (tag.equals("name")) {
                person.setName(contens);
            } else if (tag.equals("age")) {
                if (contens.length() > 0) {
                    person.setAge(Integer.valueOf(contens));
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
            if (qName.equals("person")) {
                System.out.println("内容为 = " + person.getName() + person.getAge());
                persons.add(person);
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

