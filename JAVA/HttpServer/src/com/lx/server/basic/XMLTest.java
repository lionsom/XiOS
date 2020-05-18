package com.lx.server.basic;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.io.IOException;

/*
 * 熟悉SAX解析流程
 */
public class XMLTest {

    public static void main(String[] args) throws ParserConfigurationException, SAXException, IOException {
        // SAX解析
        // 1.获取解析工厂
        SAXParserFactory factory = SAXParserFactory.newInstance();
        // 2.从解析工厂获取解析器
        SAXParser mParse = factory.newSAXParser();
        // 3.加载文档Document注册处理器

        // 4.编写处理器
        PHandler handler = new PHandler();

        // 5.解析
        mParse.parse(Thread.currentThread().getContextClassLoader().getResourceAsStream("com/lx/server/basic/person.xml"), handler);
    }
}

class PHandler extends DefaultHandler {
    @Override
    public void startDocument() throws SAXException {
        super.startDocument();

        System.out.println("解析文档开始");
    }

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        super.startElement(uri, localName, qName, attributes);

        System.out.println("qName 解析开始 = "+qName);
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        super.endElement(uri, localName, qName);

        System.out.println("qName 解析结束 = "+qName);
    }

    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        super.characters(ch, start, length);

        String contens = new String(ch, start, length).trim();
        if (contens.length() > 0) {
            System.out.println("内容为" + contens);
        } else {
            System.out.println("内容为" + "---空---");
        }
    }

    @Override
    public void endDocument() throws SAXException {
        super.endDocument();

        System.out.println("解析文档结束");
    }
}
