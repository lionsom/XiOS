#!/usr/bin/python3
# -*- coding: utf-8 -*-
import argparse
import os
import os.path
import chardet
import codecs
import re

from googletrans import Translator

##################################这个部分的代码作用：加载.strings文件并解析其内容，将其存放在数组中，数组的元素key：value：commit： 格式，，可以单独放在一个function.py中#################################
############################### 如果单独放在function.py中，该文件的进入方式为： from functions import readTranslations, writeTranslationToFile, clearContentsOfFile
# import chardet
# import codecs
# import os
# import os.path
# import re
format_encoding = 'UTF-16'

def readTranslations(fileName):
    """
    Read in a given Localizable.strings file and return a list of key / value pairs read for each line of translation.

    :param fileName:
    :return: List of tuples with key / value pairs of each translation found
    """

    #print("Reading Localizable.strings from path: %s" % (fileName))
    if not os.path.exists(fileName):
        print(" ... no file found, returning empty translation")
        return []
    #endif

    stringset = []
    f = _get_content_from_file(filename=fileName)
    if f.startswith(u'\ufeff'):
        f = f.lstrip(u'\ufeff')
    #end if
    # regex for finding all comments in a file
    cp = r'(?:/\*(?P<comment>(?:[^*]|(?:\*+[^*/]))*\**)\*/)'
    p = re.compile(
        r'(?:%s[ \t]*[\n]|[\r\n]|[\r]){0,1}(?P<line>(("(?P<key>[^"\\]*(?:\\.[^"\\]*)*)")|(?P<property>\w+))\s*=\s*"(?P<value>[^"\\]*(?:\\.[^"\\]*)*)"\s*;)' % cp,
        re.DOTALL | re.U)
    # c = re.compile(r'\s*/\*(.|\s)*?\*/\s*', re.U)
    c = re.compile(r'//[^\n]*\n|/\*(?:.|[\r\n])*?\*/', re.U)
    ws = re.compile(r'\s+', re.U)
    end = 0
    start = 0
    for i in p.finditer(f):
        start = i.start('line')
        end_ = i.end()
        key = i.group('key')
        comment = i.group('comment') or ''

        if not key:
            key = i.group('property')
        #end if

        value = i.group('value')
        while end < start:
            m = c.match(f, end, start) or ws.match(f, end, start)
            if not m or m.start() != end:
                print("Invalid syntax: %s" % f[end:start])
                continue
            #end if
            if m is not None:
                end = m.end()
        #end while
        end = end_
        #key = _unescape_key(key)
        stringset.append({'key': key, 'value': value, 'comment': comment})
    return stringset
#end def

def _unescape_key(s):
    return s.replace('\\\n', '')
#end def

def _unescape(s):
    return _unescape_key(s)
    # s = s.replace('\\\n', '')
    # return s.replace('\\"', '"').replace(r'\n', '\n').replace(r'\r', '\r')
#end def

def _get_content_from_file(filename, encoding='UTF-16'):
    f = open(filename, 'rb')
    try:
        content = f.read()
        if chardet.detect(content)['encoding'].startswith(format_encoding):
            #f = f.decode(format_encoding)
            encoding = format_encoding
        else:
            #f = f.decode(default_encoding)
            encoding = 'utf-8'
        f.close()
        f = codecs.open(filename, 'r', encoding=encoding)
        return f.read()
    except IOError as e:
        print("Error opening file %s with encoding %s: %s" % (filename, format_encoding, e.message))
    except Exception as e:
        print("Unhandled exception: %s" % e.message)
    finally:
        f.close()
    #end try
#end def

def createOutputDirectoryIfNotExists(fileName):
    if not os.path.exists(os.path.dirname(fileName)):
        os.makedirs(os.path.dirname(fileName))
    #end if
#end def

def writeCommentToFile(stringsFileName, comment, outputTargetCode):
    outputFileName = os.path.join("output", outputTargetCode + os.path.join(".lproj", stringsFileName))

    with open(outputFileName, "a", encoding="utf-8") as myfile:
        createOutputDirectoryIfNotExists(outputFileName)
        contentToWrite = "/* " + comment.strip() + " */\n\n"
        myfile.write(contentToWrite)
    #end with
#end def

def writeTranslationToFile(stringsFileName, sourceText, translatedText, comment, outputTargetCode):
    outputFileName = os.path.join("output", outputTargetCode + os.path.join(".lproj", stringsFileName))

    with open(outputFileName, "a", encoding="utf-8") as myfile:
        createOutputDirectoryIfNotExists(outputFileName)
        contentToWrite = ""
        if len(comment) != 0:
            contentToWrite = "/* " + comment.strip() + " */\n"
        #end if
        contentToWrite += "\"" + sourceText + "\" = \"" + translatedText + "\";\n\n"
        myfile.write(contentToWrite)
    #end with
#end def

def clearContentsOfFile(stringsFileName, target):
    fileName = os.path.join("output", target + os.path.join(".lproj", stringsFileName))

    createOutputDirectoryIfNotExists(fileName)
    open(fileName, 'w').close()
#end def

##################################上面这部分的代码作用：加载.strings文件并解析其内容，将其存放在数组中，数组的元素key：value：commit： 格式的，可以单独放在一个function.py中#################################

parser = argparse.ArgumentParser()
parser.add_argument("-f", default="Localizable.strings", help="set the path to the original Localizable.strings to read keys from")
parser.add_argument("-o", default="zh-cn", help="set the origin locale for auto translation, default is Chinese")
parser.add_argument("-d", default="", help="For delta translations. Set the path to the root directory where existing localized translations exist. If specified, this path will be used to check if a line / key has already been translated and skip translating that line. This way only the keys that do not exist in the existing destination file will be translated.")
parser.add_argument("-e", default="0", help="emulate only. This will not perform any translation but instead emulate and print out details of strings that would need to be translated.")
parser.add_argument("-v", default="0", help="Verbose")
args = parser.parse_args()

def translateSourceText(sourceText, translateTargetCode):
    """
    Return translation for source text using Google
    :param sourceText: source text to translate
    :param translateTargetCode: target language (google translation code)
    :return:
    """

    translatedText = sourceText

    try:
        if str(args.e).strip().lower() == "1":
            if args.v == "1":
                print("  ..... Translating in Emulation: %s" % (sourceText))
            #end if

            pass
        else:
            googleTranslator = Translator()
            obj = googleTranslator.translate(sourceText, src=args.o, dest=translateTargetCode)

            translatedText = obj.text

            if args.v == "1":
                print("  ..... Translated with Google: %s => %s" % (sourceText, translatedText))
            #end if
        #end if
    except Exception as e:
        print("\n  ..... !! FAILED !! to translate for %s: %s = %s\n" % (translateTargetCode, sourceText, e))

        return (sourceText, False, False)
    #end try

    # google can not produce translations with double quotes, we need to escape those properly
    print("____________________翻译后的文字为：%s" % translatedText)
    translatedText = translatedText.replace('\\N', '\\n')
    translatedText = translatedText.replace('\\ N', '\\n')
    translatedText = translatedText.replace('\\"', '"')
    translatedText = translatedText.replace("\"", "\\\"")
    translatedText = translatedText.replace("％", "%")
    translatedText = translatedText.replace("% @", "%@")
    translatedText = translatedText.replace("（", " (")
    translatedText = translatedText.replace("）", ") ")
    translatedText = translatedText.replace("% @", "%@")
    translatedText = translatedText.replace( "% 1 $ @", "%1$@")
    translatedText = translatedText.replace( "% 2 $ @", "%2$@")
    translatedText = translatedText.replace( "% 3 $ @", "%3$@")
    translatedText = translatedText.replace( "% 1 $ l", "%1$l")
    translatedText = translatedText.replace( "% 2 $ l", "%2$l")
    translatedText = translatedText.replace( "% 3 $ l", "%3$l")
    translatedText = translatedText.replace( "% L", "%l")
    translatedText = translatedText.replace( "% 1 $ L", "%1$l")
    translatedText = translatedText.replace( "% 2 $ L", "%2$l")
    translatedText = translatedText.replace("\\ n", "\n")
    translatedText = translatedText.strip(' ')

    # Some basic validation to confirm translation did not get rid of formatters in source text
    totalFormattersInSource = sourceText.count('%')
    totalFormattersInOutput = translatedText.count('%')

    formatterFailed = False
    if totalFormattersInSource != totalFormattersInOutput:
        formatterFailed = True
        print("\n  ..... !! WARNING !! Formatters don't match in: %s => %s (lang: %s)\n" % (sourceText, translatedText, translateTargetCode))
    elif translatedText.count('% ') != sourceText.count('% '):
        formatterFailed = True
        print("\n  ..... !! WARNING !! Formatters have an invalid space: %s => %s (lang: %s)\n" % (
        sourceText, translatedText, translateTargetCode))
    #end if

    if translatedText.find('%') != -1 and translatedText[translatedText.find('%') + 1] not in ['u', 'l', '@', 'f', '1', '2', '3', 'd', '.']:
        formatterFailed = True

        print("\n  ..... !! WARNING !! Invalid formatter: %s => %s (lang: %s)\n" % (
        sourceText, translatedText, translateTargetCode))
    # end if

    return (translatedText, True, formatterFailed)
#end def

def translationNeeded(translationTuple, translateTargetCode, existingTranslations):
    """
    Check if translation is required for a given source key. If not delta-translating, this will always return True
    other wise False if translation key found in original target Localizable.strings file.

    :param translationTuple: key / value
    :param translateTargetCode:  target language
    :param existingTranslations:  existing target translations
    :return: True if needed, False if translation was found in the original target.
    """
    stringName = translationTuple['key']
    sourceText = translationTuple['value']

    for existingTranslation in existingTranslations:
        existingKey = existingTranslation['key']
        if existingKey == stringName:
            return False
        #end if
    #end for

    return True
#end def

def translateLineInFile(translationTuple, translateTargetCode, outputTargetCode):
    """
    Translate a given key / value tuple to a target language.

    :param translationTuple: key / value
    :param translateTargetCode:  target language
    :param outputTargetCode:  output target code
    """
    stringName = translationTuple['key']
    sourceText = translationTuple['value']
    stringComment = translationTuple['comment']

    if not stringComment:
        stringComment = ""
    #end if

    (translation, success, warning) = translateSourceText(sourceText, translateTargetCode)

    if success:
        # Only save translated lines
        if str(args.e).strip().lower() == "1":
            # Emulating only
            pass
        else:
            writeTranslationToFile(stringsFileName, stringName, translation, stringComment, outputTargetCode)
        #end if
    #end if

    return (success, warning)
#end def

def translateFile(stringsFileName, translateFriendlyName, translateTargetCode, outputTargetCode):
    """
    Translate source language for the given target language / output file
    :param stringsFileName: The .strings file name
    :param translateFriendlyName: friendly name for printing
    :param translateTargetCode: google translation target code
    :param outputTargetCode: output target code
    :return:
    """
    print("Translating for: " + translateFriendlyName)

    clearContentsOfFile(stringsFileName, outputTargetCode)

    # When delta-translating, pre-load existing translations to compare against
    existingOutputTranslations = []
    if len(args.d.strip()) != 0:
        fullExistingPath = os.path.expanduser(args.d.strip())

        pathToExistingFile = os.path.join(fullExistingPath, outputTargetCode + os.path.join(".lproj", stringsFileName))

        print("Reading existing Localizable.strings from path: %s" % (pathToExistingFile))

        existingOutputTranslations = readTranslations(pathToExistingFile)

        print("  ... will only translate new keys. Existing translations found: %s keys" % (len(existingOutputTranslations)))
    #end if

    totalLinesTranslated = 0
    totalLinesNeeded = 0
    totalSkipped = 0
    totalWarnings = 0
    for translationTuple in originLines:
        if translationNeeded(translationTuple, translateTargetCode, existingOutputTranslations):
            totalLinesNeeded += 1

            (success, warning) = translateLineInFile(translationTuple, translateTargetCode, outputTargetCode)
            if success:
                totalLinesTranslated += 1
            #end if
            if warning:
                totalWarnings += 1
            #end if
        else:
            totalSkipped += 1
            if args.v == "1":
                print("  ........... skipping already translated key: %s" % (translationTuple['key']))
            #end if
        #end if
    #end for

    if totalWarnings != 0:
        print("ERROR: CHECK WARNINGS. Total reported %s" % (totalWarnings))
    #end if

    if totalLinesNeeded != totalLinesTranslated:
        print("ERROR: NOT ALL LINES TRANSLATED. Total lines translated for %s: %s. Original source count: %s" % (translateFriendlyName, totalLinesTranslated, totalLinesNeeded))
    else:
        if len(args.d.strip()) != 0:
            print("SUCCESS: New lines translated for %s: %s, skipped: %s" % (translateFriendlyName, totalLinesTranslated, totalSkipped))
        else:
            print("SUCCESS: Total lines translated for %s: %s" % (translateFriendlyName, totalLinesTranslated))
        #endif
    #end if
#end def

# Read and cache origin language once
originPath = os.path.expanduser(args.f.strip())
dirName, stringsFileName = os.path.split(originPath)
print("Reading source language: %s" % (originPath))
print("Will use filename: %s" % (stringsFileName))

originLines = readTranslations(originPath)

print("Total lines in source: %s\n" % (len(originLines)))

translateFile(stringsFileName, "English", "en", "en")



