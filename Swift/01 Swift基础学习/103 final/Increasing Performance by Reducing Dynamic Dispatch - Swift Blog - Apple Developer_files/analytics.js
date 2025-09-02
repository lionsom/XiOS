function isTouchAvailable() {
    return !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
}

function isStoreLink(url) {
    var pattern = new RegExp(/^(https?:\/\/www.apple.com)?(\/[a-z\-_]*)?\/shop(\/.*)?$/i);
    if (typeof url !== "string") {
        return false
    }
    return pattern.test(url)
}
if (typeof AC === "object" && typeof AC.onDOMReady === "function" && typeof AC.Element === "object" && typeof AC.Storage === "object") {
    AC.onDOMReady(function() {
        function trackNav(link, loc) {
            var linkTitle = link.getAttribute("data-analytics-title");
            var linkUrl = link.href ? link.getAttribute("href") : "";
            var linkText;
            if (linkTitle) {
                linkText = linkTitle
            } else {
                linkText = typeof link.innerText === "string" ? link.innerText.trim() : link.textContent.trim()
            }

            function setNavigationSrc(linkText, loc, linkUrl) {
                var navSource = {
                    region: loc,
                    pageName: s.pageName,
                    linkText: linkText,
                    eVar1: s.pageName + " | " + loc + " | " + linkText
                };
                var regionStr = JSON.stringify ? JSON.stringify(navSource) : "";
                if (regionStr) {
                    if (isStoreLink(linkUrl) === false) {
                        AC.Storage.setItem("ac-storage-apple_Metrics", regionStr, "0")
                    } else {
                        if (window.localStorage !== undefined) {
                            window.localStorage.setItem("apple_Metrics", regionStr)
                        }
                    }
                }
            }
            if (isTouchAvailable() === true) {
                var moved;
                AC.Element.addEventListener(link, "touchstart", function(e) {
                    moved = false;

                    function onTouchMove(e) {
                        moved = true
                    }

                    function onTouchEnd(e) {
                        AC.Element.removeEventListener(link, "touchmove", onTouchMove);
                        AC.Element.removeEventListener(link, "touchend", onTouchEnd);
                        if (!moved) {
                            setNavigationSrc(linkText, loc, linkUrl)
                        }
                    }
                    AC.Element.addEventListener(link, "touchmove", onTouchMove);
                    AC.Element.addEventListener(link, "touchend", onTouchEnd)
                })
            } else {
                AC.Element.addEventListener(link, "mouseup", function() {
                    setNavigationSrc(linkText, loc, linkUrl)
                })
            }
        }
        var globalHdr = AC.Element.selectAll("#ac-globalnav a");
        globalHdr = globalHdr.concat(AC.Element.selectAll("#globalheader a"));
        globalHdr.forEach(function(link) {
            trackNav(link, "global nav")
        });
        var productHdr = AC.Element.selectAll(".localnav a");
        productHdr = productHdr.concat(AC.Element.selectAll("#productheader a"));
        productHdr.forEach(function(link) {
            trackNav(link, "product nav")
        });
        var buyStrip = AC.Element.selectAll(".ac-gf-buystrip a");
        buyStrip = buyStrip.concat(AC.Element.selectAll(".buystrip a"));
        buyStrip = buyStrip.concat(AC.Element.selectAll("#buystrip a"));
        buyStrip.forEach(function(link) {
            trackNav(link, "buy strip")
        });
        var globalFooter = AC.Element.selectAll("#ac-globalfooter a");
        globalFooter = globalFooter.concat(AC.Element.selectAll("#globalfooter a"));
        globalFooter.forEach(function(link) {
            trackNav(link, "global footer")
        });
        var productBrowser = AC.Element.selectAll("#ac-familybrowser a");
        productBrowser = productBrowser.concat(AC.Element.selectAll(".productbrowser ul li a"));
        productBrowser.forEach(function(link) {
            trackNav(link, "product browser")
        });
        var learnMoreLinks = AC.Element.selectAll('[data-analytics-region="learn more"] a');
        learnMoreLinks.forEach(function(link) {
            trackNav(link, "learn more")
        })
    })
}

if (document.location.search && s_account) {
    var dls = document.location.search;
    if (dls.indexOf("?cid=AOS-") > -1 || dls.indexOf("&cid=AOS-") > -1) {
        s_account += ",applestoreWW"
    }
}(function() {
    function getStoreBucket() {
        var metas = document.getElementsByTagName("meta");
        var metaLength = metas.length;
        for (i = 0; i < metaLength; i++) {
            if (metas[i].getAttribute("property") === "analytics-s-bucket-store") {
                return metas[i].getAttribute("content")
            }
        }
        return ""
    }
    var storeBucket = getStoreBucket();
    if (storeBucket) {
        s_account += "," + storeBucket
    }
})();
var s = s_gi(s_account);

if (navigator && navigator.loadPurpose && navigator.loadPurpose == "preview") {
    s.t = new Function("return ''")
}

s._isSafari = false;
if (navigator.userAgent.toLowerCase().indexOf("webkit") > -1) {
    if (navigator.userAgent.toLowerCase().indexOf("safari") > -1 && navigator.userAgent.toLowerCase().indexOf("chrome") < 0) {
        s._isSafari = true
    }
}

function safariHandler(link) {
    if (s.lt(link.href)) {
        link.addEventListener("mouseup", function(evt) {
            if (evt.which && evt.which == 1 || evt.button && evt.button == 1) {
                var linkHref = evt.currentTarget.href,
                    linkType = s.lt(linkHref);
                if (linkType == "d") {
                    if (linkHref.match(/\.rss|\.xml/)) {
                        s.eVar16 = s.prop16 = "sign ups"
                    } else {
                        s.eVar11 = AC.Tracking.pageName() + " - " + linkHref.substring(linkHref.lastIndexOf("/") + 1, linkHref.length);
                        s.eVar11 = s.eVar11.toLowerCase();
                        s.eVar16 = s.prop16 = "Downloads";
                        s.events = s.apl(s.events, "event5", ",", 1)
                    }
                    s.linkTrackVars = "prop16,eVar16,eVar11,events";
                    s.linkTrackEvents = "event5"
                }
                s.linkTrackVars = "None";
                s.linkTrackEvents = "None"
            }
        }, false)
    }
}

s.currencyCode = "USD";
if (window.location.hostname.indexOf(".com.cn") > -1) {
    s.fpCookieDomainPeriods = "3"
}
s.trackDownloadLinks = true;
s.trackExternalLinks = true;
s.trackInlineStats = true;
s.useForcedLinkTracking = true;
s.forcedLinkTrackingTimeout = 100;
s.linkDownloadFileTypes = "zip,wav,mp3,doc,pdf,xls,dmg,sit,pkg,exe,mov,m4a,rss,xml,extz,safariextz";
s.linkInternalFilters = "javascript:,apple.com,mailto:,tel:";
s.linkLeaveQueryString = false;
s.linkTrackVars = "campaign";
s.linkTrackEvents = "None";
s.loadModule("Media");
s.Media.autoTrack = false;
s.Media.trackVars = "prop13,hier1";
s.Media.trackEvents = "None";
s.Media.trackWhilePlaying = true;
s.Media.trackMilestones = "10,50,90";
s.Media.monitor = function(s, media) {
    if (media.event == "CLOSE") {
        if (media.percent >= "99") {
            s.Media.trackVars = "prop13,prop16,eVar16";
            s.prop13 = "v@e: " + media.name;
            s.eVar16 = s.prop16 = "video ends";
            s.Media.track(media.name);
            s.prop13 = s.prop16 = s.eVar16 = ""
        }
        if (media.percent < "99") {
            var tmpEvent = s.events,
                tmpProp13 = s.prop13,
                tmpProp16 = s.prop16,
                tmpProp4 = s.prop4,
                tmpTrackVars = s.Media.trackVars,
                tmpTrackEvents = s.Media.trackEvents;
            s.events = s.prop13 = s.prop16 = s.eVar16 = s.prop4 = "";
            s.Media.trackVars = s.Media.trackEvents = "";
            s.Media.track(media.name);
            s.events = tmpEvent;
            s.prop13 = tmpProp13;
            s.prop16 = s.eVar16 = tmpProp16;
            s.prop4 = tmpProp4;
            s.Media.trackVars = tmpTrackVars;
            s.Media.trackEvents = tmpTrackEvents
        }
    }
};
s.eVar54 = document.location.href;
s.eVar49 = document.referrer;

var s_vi_vnum = s.c_r("s_vnum_n2_us");
if (s_vi_vnum) {
    var date = new Date;
    date.setTime(date.getTime() + 63072e6);
    var expires = "; expires=" + date.toGMTString();
    document.cookie = "s_vnum_n2_us=" + s_vi_vnum + expires + "; domain=apple.com; path=/"
}
var s_vi = s.c_r("s_vi");
if (s_vi) {
    var date = new Date;
    date.setTime(date.getTime() + 63072e6);
    var expires = "; expires=" + date.toGMTString();
    document.cookie = "s_vi=" + s_vi + expires + "; domain=apple.com; path=/"
}
var s_pv = s.c_r("s_pv");
if (s_pv) {
    var expires = ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = "s_pv=" + s_pv + expires + "; domain=apple.com; path=/"
}

function QTCheck() {
    if (AC && typeof AC.Detector != "undefined" && typeof AC.Detector.getQTVersion != "undefined") {
        return AC.Detector.isMobile() || AC.Detector.isiPad() ? "mobile" : AC.Detector.getQTVersion() == "0" ? "no quicktime" : "quicktime " + AC.Detector.getQTVersion().split(/\./)[0] + ".x"
    }
    return "quicktime not detected"
}
if (typeof iTunesDetected === "function") {
    var activeX = document.createElement("object");
    activeX.setAttribute("width", 1);
    activeX.setAttribute("height", 1);
    activeX.id = "iTunesDetectorIE";
    activeX.setAttribute("classid", "clsid:D719897A-B07A-4C0C-AEA9-9B663A28DFCB");
    document.getElementsByTagName("head")[0].appendChild(activeX);
    s.prop12 = iTunesDetected() ? "itunes" : "no itunes"
}
if (typeof AC == "undefined") {
    AC = {}
}
if (!AC.Tracking) {
    AC.Tracking = {}
}
AC.Tracking._pageName = null;
AC.Tracking.pageName = function() {
    if (AC.Tracking._pageName) {
        return AC.Tracking._pageName
    }
    var metaTags = document.getElementsByTagName("meta");
    for (var i = 0, metaTag; metaTag = metaTags[i]; i++) {
        if ("omni_page" === metaTag.getAttribute("name")) {
            AC.Tracking._pageName = metaTag.getAttribute("content").toLowerCase();
            return AC.Tracking._pageName
        }
    }
    return AC.Tracking._pageNameForTitle_atHost_andPath(document.title, window.location.hostname, window.location.pathname)
};
AC.Tracking._pageNameForTitle_atHost_andPath = function(title, host, pathName) {
    var pageName = title.toLowerCase();
    if (/\s-\s/.test(pageName)) {
        pageName = pageName.replace(/\s*-?\s*(apple|ã‚¢ãƒƒãƒ—ãƒ«|ì• í”Œì»´í“¨í„°ì½”ë¦¬ì•„|è˜‹æžœ|è˜‹æžœé›»è…¦|appleä¸­å›½|è‹¹æžœä¸­å›½)\s+[^-]*-?\s*/, "")
    }
    if (!pathName.match(/^\/(ws|pr|g5|go|ta|wm)\//)) {
        pathName = pathName.replace(/^\/(\w{2}|befr|benl|chfr|chde|asia|lae)(?=\/)/, "")
    }
    if (pathName.match(/\//g).length <= 2 && !pathName.match(/support/) && !host.match(/support/) && !host.match(/selfsolve/) && (!!pathName.match(/index\.html/) || !pathName.match(/\.html/))) {
        pageName += " - index"
    }
    if (/\/pr\//.test(pathName)) {
        pageName = "pr - " + pageName
    }
    return pageName
};

s.usePlugins = true;

function s_doPlugins(s) {
    s.tcall = typeof s.linkType == "undefined" ? true : false;
    if (s.pageName) {
        var pgEscaped = escape(s.pageName);
        pgEscaped = pgEscaped.replace(/(%u2018|%u2019|%u02BC|%u02BD)/g, "%27");
        pgEscaped = pgEscaped.replace(/(%u201C|%u201D|%E2%80%9C|%E2%80%9D)/g, "%22");
        pgEscaped = pgEscaped.replace(/(%09|%0A|%0D)/g, "");
        s.pageName = unescape(pgEscaped)
    }
    
    if (window.devicePixelRatio >= 2) {
        s.prop5 = navigator.platform + " 2x"
    } else {
        s.prop5 = navigator.platform
    }
    
    tempVar1 = s.Util.getQueryParam("ref");
    if (tempVar1 && s.tcall) s.referrer = tempVar1;
    else if (tempVar1 && !s.tcall) s.referrer = "";
    s.server = s.Util.getQueryParam("alias");
    if (!s.server) {
        s.server = "new approach legacy"
    }
    if (!s.campaign) {
        s.campaign = s.Util.getQueryParam("cid");
        //s.setClickMapEmail("Email_PageName,Email_OID", "Email_OT");
        if (s.campaign.match(/OAS-.+?-DOMAINS-/i)) {
            var tempVar0 = "http://" + s.campaign.replace(/OAS-.+?-DOMAINS-/i, "");
            s.referrer = s.tcall ? tempVar0 : ""
        }
    }
    s.campaign = s.getValOnce(s.campaign, "s_campaign", 0);
    s.prop6 = !s.prop6 ? 'D="' + s.Util.getQueryParam("cp").toLowerCase() + ': "+pageName' : s.prop6;
    s.prop11 = s.Util.getQueryParam("sr");
    if (!s.d.URL.match(/\/channel\//) && !s.prop11 && s.c_r("s_3p")) {
        s.prop11 = s.c_r("s_3p");
        s.c_w("s_3p", "", -1)
    }
    s.eVar7 = !s.eVar7 ? s.Util.getQueryParam("aid") : "";
    s.eVar7 = s.getValOnce(s.eVar7, "s_var_7", 0);
    if (s.eVar2) s.events = s.apl(s.events, "event6", ",", 1);
    if (!s.d.URL.match(/apple.com\/(\w{2}|befr|benl|chfr|chde|asia|lae)\/search\//) && !s.d.URL.match(/apple.com\/search\//) && (s.d.referrer.match(/apple.com\/(\w{2}|befr|benl|chfr|chde|asia|lae)\/search\//) || s.d.referrer.match(/apple.com\/search\//))) {
        s.eVar2 = s.d.referrer.match(/\/support\//) ? "acs: " : s.d.referrer.match(/\/store\//) ? "aos: " : "www: ";
        if (s.d.referrer.match(/apple.com\/(\w{2}|befr|benl|chfr|chde|asia|lae)\/search/)) {
            s.eVar2 += s.getQueryParam("q", "", s.d.referrer).replace(/\+/g, " ");
            var geo = s.d.referrer.match(/\/(\w{2}|befr|benl|chfr|chde|asia|lae)\//i);
            s.eVar2 += " (" + geo[0].replace(/\//g, "") + ")"
        } else {
            s.eVar2 += s.getQueryParam("q", "", s.d.referrer).replace(/\+/g, " ") + " (us)"
        }
    }
    if (s.prop11 == "em" && s.tcall) {
        s.referrer = "imap://chatterbox.com"
    }
    if (s.prop11 == "app" && s.tcall) {
        s.referrer = "file://fromApp"
    }
    if (document.referrer && document.referrer.indexOf("apple.com/startpage/") > -1 && s.tcall) {
        s.referrer = "news://startpage.com";
        s._1_referrer = 1
    }
    if (!s.prop17) {
        var percent = s.getPercentPageViewed();
        if (percent && percent.length >= 4 && typeof percent[1] != "undefined") {
            s.prop14 = percent[0];
            s.prop17 = percent[1] + ":" + percent[2];
            s.prop28 = Math.round(percent[3] / 10) * 10;
            s.eVar17 = s.eVar18 = "";
            if (percent[4]) {
                var sva = percent[4].split(/\|/g),
                    sv = "";
                for (var i = 0; i < sva.length; i++) {
                    if (i != sva.length - 1) {
                        var diff = sva[i + 1].split(/:/)[0] - sva[i].split(/:/)[0];
                        if (diff > 100) {
                            sv += sva[i].split(/:/)[1];
                            var nz = diff / 100;
                            while (nz > 1) {
                                sv += "0";
                                nz--
                            }
                        } else {
                            sv += sva[i].split(/:/)[1]
                        }
                    } else {
                        sv += sva[i].split(/:/)[1]
                    }
                }
                if (sv.length > 254) {
                    s.eVar17 = sv.substring(0, 254);
                    s.eVar18 = sv.substring(255, sv.length)
                } else {
                    s.eVar17 = sv
                }
            }
            if (!s.tcall) {
                s.linkTrackVars = "prop17,prop28"
            }
        }
    }
    s.prop32 = s.eVar32 = s.Util.getQueryParam("psid");
    if (s.prop32 || s.c_r("s_sid")) {
        var e = new Date,
            ct = e.getTime();
        e.setTime(ct + 63072e4);
        s.prop32 ? s.c_w("s_psid", s.prop32, e) : s.c_w("s_psid", s.c_r("s_sid"), e);
        s.c_w("s_sid", "", -1)
    }
    if (!s.prop32 && !s.c_r("s_pathLength")) {
        s.prop32 = s.c_r("s_psid")
    }
    s.linkLeaveQueryString = true;
    var url = s.downloadLinkHandler();
    if (url) {
        if (url.match(/\.rss|\.xml/)) {
            s.eVar16 = s.prop16 = "sign ups"
        } else {
            s.eVar11 = AC.Tracking.pageName() + " - " + url.substring(url.lastIndexOf("/") + 1, url.length);
            s.eVar16 = s.prop16 = "downloads";
            s.events = s.apl(s.events, "event5", ",", 1)
        }
        s.linkTrackVars = "prop16,eVar16,eVar11,events";
        s.linkTrackEvents = "event5"
    }
    s.linkLeaveQueryString = false;
    if (typeof Media != "undefined" && s.tcall) {
        s.prop18 = QTCheck()
    }
    
            function osDetect(s) {
            var userAgent = navigator.userAgent;
            var match;
            if (userAgent.match(/windows/i)) {
                s.prop9 = "windows";
                return
            }
            if (userAgent.match(/(kindle|silk-accelerated)/i)) {
                if (userAgent.match(/(kindle fire|silk-accelerated)/i)) {
                    s.prop9 = "kindle fire"
                } else {
                    s.prop9 = "kindle"
                }
                return
            }
            if (userAgent.match(/(iphone|ipod|ipad)/i)) {
                match = userAgent.match(/OS [0-9_]+/i);
                s.prop9 = "i" + match[0].replace(/_/g, ".");
                return
            }
            if (userAgent.match(/android/i)) {
                s.prop9 = userAgent.match(/android [0-9]\.?[0-9]?\.?[0-9]?/i);
                return
            }
            if (userAgent.match(/webos\/[0-9\.]+/i)) {
                match = userAgent.match(/webos\/[0-9]\.?[0-9]?\.?[0-9]?/i);
                s.prop9 = match[0].replace(/webos\//i, "web os ");
                return
            }
            if (userAgent.match(/rim tablet os [0-9\.]+/i)) {
                match = userAgent.match(/rim tablet os [0-9]\.?[0-9]?\.?[0-9]?/i);
                s.prop9 = match[0].replace(/rim tablet os/i, "rim os ");
                return
            }
            if ((userAgent.match(/firefox\/(\d{2}||[3-9])/i) || userAgent.match(/AppleWebKit\//)) && userAgent.match(/Mac OS X [0-9_\.]+/)) {
                var matches = userAgent.match(/[0-9_\.]+/g);
                matches = matches[1].split(/_|\./);
                s.prop9 = matches[0] + "." + matches[1] + ".x";
                return
            }
            var mv = userAgent.match(/AppleWebKit\/\d*/i) && userAgent.match(/AppleWebKit\/\d*/i).toString().replace(/AppleWebKit\//i, "");
            if (mv > 522) {
                s.prop9 = "10.5.x"
            } else if (mv > 400) {
                s.prop9 = "10.4.x"
            } else if (mv > 99) {
                s.prop9 = "10.3.x"
            } else if (mv > 80) {
                s.prop9 = "10.2.x"
            } else {
                s.prop9 = "mac unknown or non-safari"
            }
        }
    
    osDetect(s);
    if (s.pageName && s.pageName.match(/feedback - thank you/)) {
        s.prop16 = s.eVar16 = "feedback"
    }
    if (s.prop13 && (s.tcall || s.linkType == "o" || s.linkType == "")) {
        if (s.pageName && !s.pageName.match(/movie trailers -/)) {
            if (s.prop13.match(/(v@s|v@r)/i)) {
                s.prop16 = s.eVar16 = "video plays";
                s.events = "event2";
                if (!s.tcall) {
                    s.linkTrackEvents += ",event2";
                    s.linkTrackVars += ",events,prop16,eVar16"
                }
            }
            if (s.prop13.match(/v@e/i)) {
                s.prop16 = s.eVar16 = "video ends";
                if (!s.tcall) {
                    s.linkTrackEvents = "";
                    s.linkTrackVars += ",prop16,eVar16"
                }
            }
        }
    }
    s.linkLeaveQueryString = true;
    var exitUrl = s.linkHandler("itms.apple.com|itunes.apple.com|apps.apple.com", "e");
    var url = s.linkHandler("ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/|rss.support.apple.com", "o");
    if (url) {
        s.eVar16 = s.prop16 = "sign ups";
        s.linkTrackVars = "eVar16,prop16"
    }
    s.linkLeaveQueryString = false;
    if (s.tcall) {
        var membership, pathname = window.location.pathname,
            newMembership = false,
            noMatch = true;
        if (s.c_r("iTunesPresent") || s.prop12 && s.prop12 == "iTunes") {
            membership = membership ? membership + "it," : "it,"
        }
        if (s.c_r("hasMobileMe")) {
            membership = membership ? membership + "mm," : "mm,"
        }
        if (s.c_r("DefaultAppleID") || s.pageName && s.pageName.match(/iforgot - cr or email option/)) {
            membership = membership ? membership + "aid," : "aid,"
        }
        if (s.c_r("trackStartpage")) {
            membership = membership ? membership + "sp," : "sp,"
        }
        if (s.prop11) {
            if (s.prop11.match("3p")) {
                membership = membership ? membership + "3p," : "3p,"
            }
        }
        if (s.pageName) {
            if (s.pageName.match(/one to one - index/)) {
                membership = membership ? membership + "o2o," : "o2o,"
            }
        }
        if (pathname.match("/welcomescreen/")) {
            var portion;
            if (portion = pathname.match("ilife.*")) {
                portion = "il" + portion.toString().match("[0-9]+") + ",";
                membership = membership ? membership + portion : portion
            } else if (portion = pathname.match("iwork.*")) {
                portion = "iwk" + portion.toString().match("[0-9]+") + ",";
                membership = membership ? membership + portion : portion
            } else if (portion = pathname.match("itunes.*")) {
                portion = "it" + portion.toString().match("[0-9]+") + ",";
                membership = membership ? membership + portion : portion
            } else if (portion = pathname.match("aperture.*")) {
                portion = "ap" + portion.toString().match("[0-9]+") + ",";
                membership = membership ? membership + portion : portion
            }
        }
        if (s.Util.getQueryParam("sr") && s.Util.getQueryParam("vr")) {
            var ver = s.Util.getQueryParam("vr");
            ver = ver.substring(0, ver.indexOf("-")) + ",";
            membership = membership ? membership + ver : ver
        }
        if (typeof membership != "undefined") {
            membership = membership.substring(0, membership.length - 1).toLowerCase();
            membership = membership.split(",");
            if (s.c_r("s_membership")) {
                var membershipCookie = s.c_r("s_membership").split(/:/);
                membershipCookie.splice(0, 1);
                for (i = 0; i < membership.length; i++) {
                    for (j = 0; j < membershipCookie.length; j++) {
                        if (membershipCookie[j] == membership[i]) {
                            noMatch = false
                        }
                    }
                    if (noMatch) {
                        membershipCookie[membershipCookie.length] = membership[i];
                        newMembership = true
                    }
                    noMatch = true
                }
                if (newMembership) {
                    membership = membershipCookie.length + ":" + membershipCookie.toString().replace(/,/g, ":");
                    var e = new Date,
                        ct = e.getTime();
                    e.setTime(ct + 63072e3);
                    s.c_w("s_membership", membership, e);
                    s.prop31 = membership
                }
            } else {
                membership = membership.length + ":" + membership.toString().replace(/,/g, ":");
                var e = new Date,
                    ct = e.getTime();
                e.setTime(ct + 63072e3);
                s.c_w("s_membership", membership, e);
                s.prop31 = membership
            }
        }
        if (!s.prop31 && !s.c_r("s_pathLength")) {
            s.prop31 = s.c_r("s_membership")
        }
    }(function getNavigationSource() {
        function getEntryPoint() {
            var currentDomain = window.location.host;
            var referrer = document.referrer;
            var referrerFriendlyName = "";
            if (!referrer) {
                referrerFriendlyName = "direct entry"
            } else if (referrer.split("?")[0].indexOf(currentDomain) === -1) {
                referrerFriendlyName = "third party"
            }
            return referrerFriendlyName
        }
        var entryPoint = getEntryPoint();
        if (entryPoint && entryPoint !== "") {
            s.prop25 = entryPoint
        }
        if (s.tcall && !s.prop25) {
            var navSource;
            if (isStoreLink() === true) {
                if (window.localStorage !== undefined) {
                    navSource = window.localStorage.getItem("apple_Metrics");
                    window.localStorage.removeItem("apple_Metrics")
                }
            } else {
                if (AC && typeof AC.Storage === "object") {
                    navSource = AC.Storage.getItem("ac-storage-apple_Metrics");
                    AC.Storage.removeItem("ac-storage-apple_Metrics")
                }
            }
            if (navSource) {
                var navData;
                try {
                    navData = JSON.parse(navSource)
                } catch (e) {}
                s.prop25 = navData.region ? navData.region : null;
                s.eVar1 = navData.eVar1 ? navData.eVar1 : null;
                if (navData.pageName) {
                    s.prop14 = navData.pageName
                }
                if (navData.events) {
                    if (!s.events) {
                        s.events = navData.events
                    } else {
                        s.events += "," + navData.events
                    }
                }
            }
        }
        if (s.tcall) {
            if (document.referrer.match(/(downloads|epp|store|storeint)\.apple\.com/)) {
                s.prop25 = "aos nav"
            }
        }
        if (!s.prop25) {
            s.prop25 = "other nav or none"
        }
    })();
    if ((s.pageName && s.prop14 && s.pageName.toLowerCase() != s.prop14.toLowerCase() || !s.prop14) && s.tcall) {
        var ch, cookieValue = s.c_r("s_pathLength"),
            pathLengthArray = cookieValue.indexOf(",") > -1 ? cookieValue.split(",") : [],
            e = new Date,
            ct = e.getTime();
        e.setTime(ct + 30 * 60 * 1e3);
        if (s.channel) {
            ch = s.channel.substring(s.channel.indexOf(".") + 1, s.channel.length);
            ch = ch.substring(ch.indexOf(".") + 1, ch.length)
        } else {
            ch = "no channel"
        }
        if (pathLengthArray.length != 0 && pathLengthArray.toString().indexOf(ch + "=") > -1) {
            for (i = 0; i < pathLengthArray.length; i++) {
                if (pathLengthArray[i].toString().indexOf(ch + "=") > -1) {
                    var pathLengthValue = pathLengthArray[i].split("=");
                    ++pathLengthValue[1];
                    pathLengthArray[i] = pathLengthValue[0] + "=" + pathLengthValue[1];
                    s.prop48 = pathLengthValue[1]
                }
            }
            s.c_w("s_pathLength", pathLengthArray, e)
        } else {
            var pathLengthValue = cookieValue + ch + "=" + 1 + ",";
            s.c_w("s_pathLength", pathLengthValue, e);
            s.prop48 = "1"
        }
    }

    var eVar10 = s.Util.getQueryParam ? s.Util.getQueryParam("afid") : null;
    if (eVar10) {
        s.eVar10 = s.getValOnce ? s.getValOnce(eVar10, "s_afc") : null
    }(function() {
        var topEl = document.getElementById("top");
        var locale = topEl ? topEl.getAttribute("data-analytics-locale") : "";
        if (locale) {
            s.prop20 = "aos: " + locale;
            s.prop19 = s.prop20 + (s.pageName ? ": " + s.pageName : "");
            s.eVar3 = s.prop20 || ""
        }
    })();
    s.hier1 = s.channel ? s.channel : "";
    s.linkTrackVars = s.apl(s.linkTrackVars, "hier1", ",", 1);
    s.prop4 = s.prop4 ? s.prop4 : "D=g";
    //s.manageVars("lowercaseVars", "purchaseID,pageType,events,products,transactionID", 2)
}
s.doPlugins = s_doPlugins;

s.getPercentPageViewed = function() {
    if ("undefined" == typeof s.linkType) return s.ppv.previous = sessionStorage.getItem(s.ppv.sessionStorageKey) ? sessionStorage.getItem(s.ppv.sessionStorageKey) : "", s.ppv.init(), s.ppv.previous.split(",");
    if (!s.ppv.previous) return s.ppv.previous = sessionStorage.getItem(s.ppv.sessionStorageKey) || "", s.ppv.init(), s.ppv.previous.split(",")
};
s.ppv = {
    initialPercent: 0,
    maxPercent: 0,
    throttleAmount: 500,
    sessionStorageKey: "s_ppv",
    init: function() {
        window.addEventListener("scroll", s.ppv.throttle(s.ppv.scroll, s.ppv.throttleAmount), !1);
        window.addEventListener("resize", s.ppv.throttle(s.ppv.scroll, s.ppv.throttleAmount), !1);
        window.addEventListener("beforeunload", s.ppv.unload, !1);
        window.addEventListener("load", s.ppv.scroll, !1)
    },
    scroll: function() {
        var a = s.ppv;
        if (100 != a.maxPercent) {
            var g = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
                d = document.clientHeight || document.documentElement.clientHeight || document.body.clientHeight,
                b = a.getDocHeight(),
                b = Math.round((g + d) / b * 100);
            a.initialPercent || (a.initialPercent = b);
            if (b > a.maxPercent) {
                a.maxPercent = b;
                var c = [];
                c.push(s.pageName);
                c.push(b);
                c.push(a.initialPercent);
                c.push(g + d);
                sessionStorage.setItem(a.sessionStorageKey, c.join(","))
            }
        }
    },
    getDocHeight: function() {
        var a = window.document;
        return Math.max(Math.max(a.body.scrollHeight, a.documentElement.scrollHeight), Math.max(a.body.offsetHeight, a.documentElement.offsetHeight), Math.max(a.body.clientHeight, a.documentElement.clientHeight))
    },
    unload: function() {
        sessionStorage.getItem(s.ppv.sessionStorageKey) && sessionStorage.setItem(s.ppv.sessionStorageKey, sessionStorage.getItem(s.ppv.sessionStorageKey))
    },
    throttle: function(a, g) {
        var d, b, c, e = null,
            f = 0,
            l = function() {
                f = new Date;
                e = null;
                c = a.apply(d, b)
            };
        return function() {
            var h = new Date;
            f || (f = h);
            var k = g - (h - f);
            d = this;
            b = arguments;
            0 >= k ? (clearTimeout(e), e = null, f = h, c = a.apply(d, b)) : e || (e = setTimeout(l, k));
            return c
        }
    }
};

s_sp = new Function("x", "d", "var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst" + "ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
s_jn = new Function("a", "d", "var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
s.rep = new Function("x", "o", "n", "return s_jn(s_sp(x,o),n)");
s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescap" + "e(x)}return y');return tcf(x)}else return unescape(x)}return y};
s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};
//s.pt=function(l,de,cf,fa){if(l&&this[cf]){l=l.split(de||",");de=l.length;for(var e,c=0;c<de;c++)if(e=this[cf](l[c],fa))return e}};
s.detectRIA = new Function("cn", "fp", "sp", "mfv", "msv", "sf", "" + "cn=cn?cn:'s_ria';msv=msv?msv:2;mfv=mfv?mfv:10;var s=this,sv='',fv=-" + "1,dwi=0,fr='',sr='',w,mt=s.n.mimeTypes,uk=s.c_r(cn),k=s.c_w('s_cc'," + "'true',0)?'Y':'N';fk=uk.substring(0,uk.indexOf('|'));sk=uk.substrin" + "g(uk.indexOf('|')+1,uk.length);if(k=='Y'&&s.p_fo('detectRIA')){if(u" + "k&&!sf){if(fp){s[fp]=fk;}if(sp){s[sp]=sk;}return false;}if(!fk&&fp)" + "{if(s.pl&&s.pl.length){if(s.pl['Shockwave Flash 2.0'])fv=2;x=s.pl['" + "Shockwave Flash'];if(x){fv=0;z=x.description;if(z)fv=z.substring(16" + ",z.indexOf('.'));}}else if(navigator.plugins&&navigator.plugins.len" + "gth){x=navigator.plugins['Shockwave Flash'];if(x){fv=0;z=x.descript" + "ion;if(z)fv=z.substring(16,z.indexOf('.'));}}else if(mt&&mt.length)" + "{x=mt['application/x-shockwave-flash'];if(x&&x.enabledPlugin)fv=0;}" + "if(fv<=0)dwi=1;w=s.u.indexOf('Win')!=-1?1:0;if(dwi&&s.isie&&w&&exec" + "Script){result=false;for(var i=mfv;i>=3&&result!=true;i--){execScri" + "pt('on error resume next: result = IsObject(CreateObject(\"Shockwav" + "eFlash.ShockwaveFlash.'+i+'\"))','VBScript');fv=i;}}fr=fv==-1?'Flas" + "h Not Detected':fv==0?'Flash Enabled (No Version)':'Flash '+fv;}if(" + "!sk&&sp&&s.apv>=4.1){var tc='try{x=new ActiveXObject(\"AgControl.A'" + "+'gControl\");for(var i=msv;i>0;i--){for(var j=9;j>=0;j--){if(x.is'" + '+\'VersionSupported(i+"."+j)){sv=i+"."+j;break;}}if(sv){break;}\'' + "+'}}catch(e){try{x=navigator.plugins[\"Silverlight Plug-In\"];sv=x'" + "+'.description.substring(0,x.description.indexOf(\".\")+2);}catch('" + "+'e){}}';eval(tc);sr=sv==''?'Silverlight Not Detected':'Silverlight" + " '+sv;}if((fr&&fp)||(sr&&sp)){s.c_w(cn,fr+'|'+sr,0);if(fr)s[fp]=fr;" + "if(sr)s[sp]=sr;}}");
s.downloadLinkHandler = new Function("p", "" + "var s=this,h=s.p_gh(),n='linkDownloadFileTypes',i,t;if(!h||(s.linkT" + "ype&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;" + "if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return h;");
s.linkHandler = new Function("p", "t", "" + "var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN" + "ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h." + "substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam" + "e=l=='[['?'':l;s.linkType=t;return h;}return '';");
s.p_gn = new Function("t", "h", "" + "var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x=" + "t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}" + "return 0;");
s.getPreviousValue = new Function("v", "c", "el", "" + "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el" + "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i" + "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)" + ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?" + "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
//s.setupDynamicObjectIDs = new Function("" + "var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv" + ">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else" + " if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa" + "lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho" + "re=1}");
s.setOIDs = new Function("e", "" + "var s=s_c_il[" + s._in + "],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i" + ",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)" + "{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];" + "if(s._isSafari){safariHandler(l);}" + "c=l[o]?''+l[o]:'';b" + "=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_" + "objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re" + "pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';" + "if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0" + ")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this." + "s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o" + "]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");
s.getQueryParam = new Function("p", "d", "u", "" + "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati" + "on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p" + ".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-" + "1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i=" + "=p.length?i:i+1)}return v");
s.p_gpv = new Function("k", "u", "" + "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v" + "=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf = new Function("t", "k", "" + "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T" + "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s." + "epa(v)}return ''");
s.getValOnce = new Function("v", "c", "e", "" + "var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c" + ");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return" + " v==k?'':v");
s.setClickMapEmail = new Function("qp", "ot", "" + "var s=this,v=s.getQueryParam(qp,'~'),d,pn,oid,ot=s.getQueryParam(ot)" + ",ot=ot?ot:'A',cv;d=v.indexOf('~');if(!v)return '';if(d>-1){pn=v.subs" + "tring(0,d);oid=v.substring(d+1);}cv='&pid='+s.ape(s.fl(pn,255))+'&pi" + "dt=1&oid='+s.ape(s.fl(oid,100))+'&oidt=1&ot='+ot+'&oi=1';s.sq(cv);");
s.getAndPersistValue = new Function("v", "c", "e", "" + "var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if(" + "v)s.c_w(c,v,e?a:0);return s.c_r(c);");
s.__se = new Function("" + "var l={'~':'tl:[\\'','^': 'kw:[\\'','%': 'ahoo','|': '\\'],','>': '" + "\\']}','*': '.com','$': 'search',';':'query','#':'land','`':'oogle'" + ",'+':'http://www','<':'keyword'};var f=this.___se+'';var g='';for(v" + "ar i=0;i<f.length;i++){if(l[f.substring(i,i+1)]&&typeof l[f.substri" + "ng(i,i+1)]!='undefined'){g+=l[f.substring(i,i+1)];}else{g+=f.substr" + "ing(i,i+1);}}return eval('('+g+')');");
s.___se = "{}";
s.isEntry = new Function("" + "var s=this;var l=s.linkInternalFilters,r=s.referrer||typeof s.refer" + "rer!='undefined'?s.referrer:document.referrer,p=l.indexOf(','),b=0," + "v='';if(!r){return 1;}while(p=l.indexOf(',')){v=p>-1?l.substring(b," + "p):l;if(v=='.'||r.indexOf(v)>-1){return 0;}if(p==-1){break;}b=p+1;l" + "=l.substring(b,l.length);}return 1;");
s.p_fo = new Function("n", "" + "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]=" + "new Object;return 1;}else {return 0;}");
s.manageVars = new Function("c", "l", "f", "" + "var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa" + "geName,purchaseID,channel,server,pageType,campaign,state,zip,events" + ",products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar" + "'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl" + "it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l" + "a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}" + "}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0" + ");return true;}else{return false;}");
s.clearVars = new Function("t", "var s=this;s[t]='';");
s.lowercaseVars = new Function("t", "" + "var s=this;if(s[t]&&t!='events'){s[t]=s[t].toString();if(s[t].index" + "Of('D=')!=0){s[t]=s[t].toLowerCase();}}");
s.join = new Function("v", "p", "" + "var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back" + ":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0" + ";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el" + "se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");
s.p_fo = new Function("n", "" + "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]=" + "new Object;return 1;}else {return 0;}");
s.p_gh = new Function("" + "var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot(" + "o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){" + "o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s." + "ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");
s.apl = new Function("L", "v", "d", "u", "" + "var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a." + "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas" + "e()));}}if(!m)L=L?L+d+v:v;return L");
s.repl = new Function("x", "o", "n", "" + "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x." + "substring(i+o.length);i=x.indexOf(o,i+l)}return x");
s.split = new Function("l", "d", "" + "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x" + "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
s.vpr = new Function("vs", "v", "if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");
s.trackingServer = "metrics.apple.com";
s.trackingServerSecure = "securemetrics.apple.com";
s.dc = 112;
function AppMeasurement_Module_Media(q){var b=this;b.s=q;q=window;q.s_c_in||(q.s_c_il=[],q.s_c_in=0);b._il=q.s_c_il;b._in=q.s_c_in;b._il[b._in]=b;q.s_c_in++;b._c="s_m";b.list=[];b.open=function(d,c,e,k){var f={},a=new Date,l="",g;c||(c=-1);if(d&&e){b.list||(b.list={});b.list[d]&&b.close(d);k&&k.id&&(l=k.id);if(l)for(g in b.list)!Object.prototype[g]&&b.list[g]&&b.list[g].R==l&&b.close(b.list[g].name);f.name=d;f.length=c;f.offset=0;f.e=0;f.playerName=b.playerName?b.playerName:e;f.R=l;f.C=0;f.a=0;f.timestamp=
Math.floor(a.getTime()/1E3);f.k=0;f.u=f.timestamp;f.c=-1;f.n="";f.g=-1;f.D=0;f.I={};f.G=0;f.m=0;f.f="";f.B=0;f.L=0;f.A=0;f.F=0;f.l=!1;f.v="";f.J="";f.K=0;f.r=!1;f.H="";f.complete=0;f.Q=0;f.p=0;f.q=0;b.list[d]=f}};b.openAd=function(d,c,e,k,f,a,l,g){var h={};b.open(d,c,e,g);if(h=b.list[d])h.l=!0,h.v=k,h.J=f,h.K=a,h.H=l};b.M=function(d){var c=b.list[d];b.list[d]=0;c&&c.monitor&&clearTimeout(c.monitor.interval)};b.close=function(d){b.i(d,0,-1)};b.play=function(d,c,e,k){var f=b.i(d,1,c,e,k);f&&!f.monitor&&
(f.monitor={},f.monitor.update=function(){1==f.k&&b.i(f.name,3,-1);f.monitor.interval=setTimeout(f.monitor.update,1E3)},f.monitor.update())};b.click=function(d,c){b.i(d,7,c)};b.complete=function(d,c){b.i(d,5,c)};b.stop=function(d,c){b.i(d,2,c)};b.track=function(d){b.i(d,4,-1)};b.P=function(d,c){var e="a.media.",k=d.linkTrackVars,f=d.linkTrackEvents,a="m_i",l,g=d.contextData,h;c.l&&(e+="ad.",c.v&&(g["a.media.name"]=c.v,g[e+"pod"]=c.J,g[e+"podPosition"]=c.K),c.G||(g[e+"CPM"]=c.H));c.r&&(g[e+"clicked"]=
!0,c.r=!1);g["a.contentType"]="video"+(c.l?"Ad":"");g["a.media.channel"]=b.channel;g[e+"name"]=c.name;g[e+"playerName"]=c.playerName;0<c.length&&(g[e+"length"]=c.length);g[e+"timePlayed"]=Math.floor(c.a);0<Math.floor(c.a)&&(g[e+"timePlayed"]=Math.floor(c.a));c.G||(g[e+"view"]=!0,a="m_s",b.Heartbeat&&b.Heartbeat.enabled&&(a=c.l?b.__primetime?"mspa_s":"msa_s":b.__primetime?"msp_s":"ms_s"),c.G=1);c.f&&(g[e+"segmentNum"]=c.m,g[e+"segment"]=c.f,0<c.B&&(g[e+"segmentLength"]=c.B),c.A&&0<c.a&&(g[e+"segmentView"]=
!0));!c.Q&&c.complete&&(g[e+"complete"]=!0,c.S=1);0<c.p&&(g[e+"milestone"]=c.p);0<c.q&&(g[e+"offsetMilestone"]=c.q);if(k)for(h in g)Object.prototype[h]||(k+=",contextData."+h);l=g["a.contentType"];d.pe=a;d.pev3=l;var q,s;if(b.contextDataMapping)for(h in d.events2||(d.events2=""),k&&(k+=",events"),b.contextDataMapping)if(!Object.prototype[h]){a=h.length>e.length&&h.substring(0,e.length)==e?h.substring(e.length):"";l=b.contextDataMapping[h];if("string"==typeof l)for(q=l.split(","),s=0;s<q.length;s++)l=
q[s],"a.contentType"==h?(k&&(k+=","+l),d[l]=g[h]):"view"==a||"segmentView"==a||"clicked"==a||"complete"==a||"timePlayed"==a||"CPM"==a?(f&&(f+=","+l),"timePlayed"==a||"CPM"==a?g[h]&&(d.events2+=(d.events2?",":"")+l+"="+g[h]):g[h]&&(d.events2+=(d.events2?",":"")+l)):"segment"==a&&g[h+"Num"]?(k&&(k+=","+l),d[l]=g[h+"Num"]+":"+g[h]):(k&&(k+=","+l),d[l]=g[h]);else if("milestones"==a||"offsetMilestones"==a)h=h.substring(0,h.length-1),g[h]&&b.contextDataMapping[h+"s"][g[h]]&&(f&&(f+=","+b.contextDataMapping[h+
"s"][g[h]]),d.events2+=(d.events2?",":"")+b.contextDataMapping[h+"s"][g[h]]);g[h]&&(g[h]=0);"segment"==a&&g[h+"Num"]&&(g[h+"Num"]=0)}d.linkTrackVars=k;d.linkTrackEvents=f};b.i=function(d,c,e,k,f){var a={},l=(new Date).getTime()/1E3,g,h,q=b.trackVars,s=b.trackEvents,t=b.trackSeconds,u=b.trackMilestones,v=b.trackOffsetMilestones,w=b.segmentByMilestones,x=b.segmentByOffsetMilestones,p,n,r=1,m={},y;b.channel||(b.channel=b.s.w.location.hostname);if(a=d&&b.list&&b.list[d]?b.list[d]:0)if(a.l&&(t=b.adTrackSeconds,
u=b.adTrackMilestones,v=b.adTrackOffsetMilestones,w=b.adSegmentByMilestones,x=b.adSegmentByOffsetMilestones),0>e&&(e=1==a.k&&0<a.u?l-a.u+a.c:a.c),0<a.length&&(e=e<a.length?e:a.length),0>e&&(e=0),a.offset=e,0<a.length&&(a.e=a.offset/a.length*100,a.e=100<a.e?100:a.e),0>a.c&&(a.c=e),y=a.D,m.name=d,m.ad=a.l,m.length=a.length,m.openTime=new Date,m.openTime.setTime(1E3*a.timestamp),m.offset=a.offset,m.percent=a.e,m.playerName=a.playerName,m.mediaEvent=0>a.g?"OPEN":1==c?"PLAY":2==c?"STOP":3==c?"MONITOR":
4==c?"TRACK":5==c?"COMPLETE":7==c?"CLICK":"CLOSE",2<c||c!=a.k&&(2!=c||1==a.k)){f||(k=a.m,f=a.f);if(c){1==c&&(a.c=e);if((3>=c||5<=c)&&0<=a.g&&(r=!1,q=s="None",a.g!=e)){h=a.g;h>e&&(h=a.c,h>e&&(h=e));p=u?u.split(","):0;if(0<a.length&&p&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h/a.length*100<g&&a.e>=g&&(r=!0,n=p.length,m.mediaEvent="MILESTONE",a.p=m.milestone=g);if((p=v?v.split(","):0)&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h<g&&e>=g&&(r=!0,n=p.length,m.mediaEvent=
"OFFSET_MILESTONE",a.q=m.offsetMilestone=g)}if(a.L||!f){if(w&&u&&0<a.length){if(p=u.split(","))for(p.push("100"),n=h=0;n<p.length;n++)if(g=p[n]?parseFloat(""+p[n]):0)a.e<g&&(k=n+1,f="M:"+h+"-"+g,n=p.length),h=g}else if(x&&v&&(p=v.split(",")))for(p.push(""+(0<a.length?a.length:"E")),n=h=0;n<p.length;n++)if((g=p[n]?parseFloat(""+p[n]):0)||"E"==p[n]){if(e<g||"E"==p[n])k=n+1,f="O:"+h+"-"+g,n=p.length;h=g}f&&(a.L=!0)}(f||a.f)&&f!=a.f&&(a.F=!0,a.f||(a.m=k,a.f=f),0<=a.g&&(r=!0));(2<=c||100<=a.e)&&a.c<e&&
(a.C+=e-a.c,a.a+=e-a.c);if(2>=c||3==c&&!a.k)a.n+=(1==c||3==c?"S":"E")+Math.floor(e),a.k=3==c?1:c;!r&&0<=a.g&&3>=c&&(t=t?t:0)&&a.a>=t&&(r=!0,m.mediaEvent="SECONDS");a.u=l;a.c=e}if(!c||3>=c&&100<=a.e)2!=a.k&&(a.n+="E"+Math.floor(e)),c=0,q=s="None",m.mediaEvent="CLOSE";7==c&&(r=m.clicked=a.r=!0);if(5==c||b.completeByCloseOffset&&(!c||100<=a.e)&&0<a.length&&e>=a.length-b.completeCloseOffsetThreshold)r=m.complete=a.complete=!0;l=m.mediaEvent;"MILESTONE"==l?l+="_"+m.milestone:"OFFSET_MILESTONE"==l&&(l+=
"_"+m.offsetMilestone);a.I[l]?m.eventFirstTime=!1:(m.eventFirstTime=!0,a.I[l]=1);m.event=m.mediaEvent;m.timePlayed=a.C;m.segmentNum=a.m;m.segment=a.f;m.segmentLength=a.B;b.monitor&&4!=c&&b.monitor(b.s,m);b.Heartbeat&&b.Heartbeat.enabled&&0<=a.g&&(r=!1);0==c&&b.M(d);r&&a.D==y&&(d={contextData:{}},d.linkTrackVars=q,d.linkTrackEvents=s,d.linkTrackVars||(d.linkTrackVars=""),d.linkTrackEvents||(d.linkTrackEvents=""),b.P(d,a),d.linkTrackVars||(d["!linkTrackVars"]=1),d.linkTrackEvents||(d["!linkTrackEvents"]=
1),b.s.track(d),a.F?(a.m=k,a.f=f,a.A=!0,a.F=!1):0<a.a&&(a.A=!1),a.n="",a.p=a.q=0,a.a-=Math.floor(a.a),a.g=e,a.D++)}return a};b.O=function(d,c,e,k,f){var a=0;if(d&&(!b.autoTrackMediaLengthRequired||c&&0<c)){if(b.list&&b.list[d])a=1;else if(1==e||3==e)b.open(d,c,"HTML5 Video",f),a=1;a&&b.i(d,e,k,-1,0)}};b.attach=function(d){var c,e,k;d&&d.tagName&&"VIDEO"==d.tagName.toUpperCase()&&(b.o||(b.o=function(c,a,d){var e,h;b.autoTrack&&(e=c.currentSrc,(h=c.duration)||(h=-1),0>d&&(d=c.currentTime),b.O(e,h,a,
d,c))}),c=function(){b.o(d,1,-1)},e=function(){b.o(d,1,-1)},b.j(d,"play",c),b.j(d,"pause",e),b.j(d,"seeking",e),b.j(d,"seeked",c),b.j(d,"ended",function(){b.o(d,0,-1)}),b.j(d,"timeupdate",c),k=function(){d.paused||d.ended||d.seeking||b.o(d,3,-1);setTimeout(k,1E3)},k())};b.j=function(b,c,e){b.attachEvent?b.attachEvent("on"+c,e):b.addEventListener&&b.addEventListener(c,e,!1)};void 0==b.completeByCloseOffset&&(b.completeByCloseOffset=1);void 0==b.completeCloseOffsetThreshold&&(b.completeCloseOffsetThreshold=
1);b.Heartbeat={};b.N=function(){var d,c;if(b.autoTrack&&(d=b.s.d.getElementsByTagName("VIDEO")))for(c=0;c<d.length;c++)b.attach(d[c])};b.j(q,"load",b.N)}


/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.8.2
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.8.2";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var p=k.AppMeasurement.Xb;p||(p=null);var n=k,m,s;try{for(m=n.parent,s=n.location;m&&m.location&&s&&""+m.location!=""+s&&n.location&&""+m.location!=""+n.location&&m.location.host==s.host;)n=m,m=n.parent}catch(u){}a.F=function(a){try{console.log(a)}catch(b){}};a.Oa=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.Fb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.Ga&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ga=0<d?c.substring(d):c}return a.Ga};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.Fb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toUTCString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.Cb=function(){var c=a.Util.getIeVersion();"number"===typeof c&&10>c&&(a.unsupportedBrowser=!0,a.rb(a,function(){}))};a.rb=function(a,b){for(var d in a)a.hasOwnProperty(d)&&"function"===typeof a[d]&&(a[d]=b)};
a.L=[];a.ja=function(c,b,d){if(a.Ha)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,h=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ka)for(a.ka=1,d=0;d<h.length;d++)a.d.addEventListener(h[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ka=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.L.push({m:c,a:b,t:e}),a.ka||setTimeout(a.delayReady,
a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.za();0<a.L.length;){d=a.L.shift();if(b&&!d.t&&d.t>c){a.L.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));break}a.Ha=1;a[d.m].apply(a,d.a);a.Ha=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ja("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=
c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,h="";e=f="";if(a.lightProfileID)d=a.P,(h=a.lightTrackVars)&&(h=","+h+","+a.oa.join(",")+",");else{d=a.g;if(a.pe||a.linkType)h=a.linkTrackVars,f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(h=a[e].Vb,f=a[e].Ub));h&&(h=","+h+","+a.H.join(",")+",");f&&h&&(h+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!h||0<=h.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,
b,d,f,e){var g="",h,l,k,q,m=0;"contextData"==c&&(c="c");if(b){for(h in b)if(!(Object.prototype[h]||e&&h.substring(0,e.length)!=e)&&b[h]&&(!d||0<=d.indexOf(","+(f?f+".":"")+h+","))){k=!1;if(m)for(l=0;l<m.length;l++)h.substring(0,m[l].length)==m[l]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),l=b[h],e&&(h=h.substring(e.length)),0<h.length))if(k=h.indexOf("."),0<k)l=h.substring(0,k),k=(e?e:"")+l+".",m||(m=[]),m.push(k),g+=a.r(l,b,d,f,k);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==
f&&0>e.indexOf(".contextData."))switch(k=h.substring(0,4),q=h.substring(4),h){case "transactionID":h="xact";break;case "channel":h="ch";break;case "campaign":h="v0";break;default:a.Oa(q)&&("prop"==k?h="c"+q:"eVar"==k?h="v"+q:"list"==k?h="l"+q:"hier"==k&&(h="h"+q,l=l.substring(0,255)))}g+="&"+a.escape(h)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.Ib=function(){var c="",b,d,f,e,g,h,l,k,q="",m="",n=e="";if(a.lightProfileID)b=a.P,(q=a.lightTrackVars)&&(q=","+q+","+a.oa.join(",")+
",");else{b=a.g;if(a.pe||a.linkType)q=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(q=a[e].Vb,m=a[e].Ub));q&&(q=","+q+","+a.H.join(",")+",");m&&(m=","+m+",",q&&(q+=",events,"));a.events2&&(n+=(""!=n?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=p;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.r("cid",
e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);h=e.substring(4);g||("events"==e&&n?(g=n,n=""):"marketingCloudOrgID"==e&&a.visitor&&(g=a.visitor.marketingCloudOrgID));if(g&&(!q||0<=q.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e=
"D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&
a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;
case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":n&&(g+=(""!=g?",":"")+n);if(m)for(h=g.split(","),g="",f=0;f<h.length;f++)l=h[f],k=l.indexOf("="),0<=k&&(l=l.substring(0,k)),k=l.indexOf(":"),0<=k&&(l=l.substring(0,k)),0<=m.indexOf(","+l+",")&&(g+=
(g?",":"")+h[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],q,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],q,e));g="";break;default:a.Oa(h)&&("prop"==f?e="c"+h:"eVar"==f?e="v"+h:"list"==
f?e="l"+h:"hier"==f&&(e="h"+h,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}a.na&&(c+="&lrt="+a.na,a.na=null);return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.$b||"undefined"!=""+a.Qb&&"HTML"!=(""+a.Qb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ka=function(a){var b=k.location,
d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.M=function(c){var b=a.D(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+
f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ka(c),e)?{id:e.substring(0,100),type:g}:0};a.Yb=function(c){for(var b=a.D(c),d=a.M(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.D(c),d=a.M(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Pb=function(){var c,b,d=a.linkObject,
f=a.linkType,e=a.linkURL,g,h;a.pa=1;d||(a.pa=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.M(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.M(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.pa=1;!e&&d&&(e=a.Ka(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,q=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),
g=l.indexOf("?"),h=l.indexOf("#"),0<=g?0<=h&&h<g&&(g=h):g=h,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),h=0;h<g.length;h++)(n=g[h])&&l.substring(l.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&!f&&(l=e.toLowerCase(),a.Na(l)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(h=
0;h<g.length;h++)n=g[h],0<=l.indexOf(n)&&(q=1);q?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Jb=function(){var c=a.pa,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||
f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,h,l,k,e=0;if(g)for(h=0;h<g.length;h++)l=g[h].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");h={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(h[k]=a.contextData[k],a.contextData[k]=
"");a.e=a.r("c",h)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(k=0;k<f.length;k++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),h=0;h<b[l].length;h++)g=b[l][h],g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(h,1),d=1);c||(d=1);if(d){e="";h=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),h=1);for(l in b)!Object.prototype[l]&&0<h&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+
"="+a.escape(l),h--);a.cookieWrite("s_sq",e)}}}return c};a.Kb=function(){if(!a.Tb){var c=new Date,b=n.location,d,f,e=f=d="",g="",h="",l="1.2",k=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",p="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?
screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;h=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.Zb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),p=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=k;a.browserWidth=g;a.browserHeight=h;a.connectionType=p;a.homepage=m;a.Tb=1}};a.Q={};a.loadModule=function(c,
b){var d=a.Q[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.kb=function(){return d.qb};d.sb=function(b){if(d.qb=b)a[c+"_onLoad"]=b,a.ja(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.kb,set:d.sb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ja(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&
d[c]()))return 1;return 0};a.Mb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.R=function(c,b){var d,f,e,g,h,l;for(d=0;2>d;d++)for(f=0<d?a.Ca:a.g,e=0;e<f.length;e++)if(g=f[e],(h=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(l in a[g])h[l]||
(h[l]=a[g][l]);a[g]=h}};a.Ya=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Ca:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.Eb=function(a){var b,d,f,e,g,h=0,l,k="",m="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(l=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?h=",q,ie,start,search_key,word,kw,cd,":
0<=e.indexOf("yahoo.co")&&(h=",p,ei,"),h&&l)))){if((a=l.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=h.indexOf(","+e.substring(0,d)+",")?k+=(k?"&":"")+e:m+=(m?"&":"")+e;k&&m?l=k+"&"+m:m=""}d=253-(l.length-m.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+l}return a};a.eb=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],
function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.fa=!1;a.J=!1;a.ub=function(){a.J=!0;a.j()};a.da=!1;a.V=!1;a.pb=function(c){a.marketingCloudVisitorID=c;a.V=!0;a.j()};a.ga=!1;a.W=!1;a.vb=function(c){a.visitorOptedOut=c;a.W=!0;a.j()};a.aa=!1;a.S=!1;a.$a=function(c){a.analyticsVisitorID=c;a.S=!0;a.j()};a.ca=!1;a.U=!1;a.bb=function(c){a.audienceManagerLocationHint=c;a.U=!0;a.j()};a.ba=!1;a.T=!1;a.ab=function(c){a.audienceManagerBlob=c;a.T=
!0;a.j()};a.cb=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.ea=!1;a.I=!1;a.za=function(){a.I=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.fa||a.J||(a.eb(a.ub)?a.J=!0:a.fa=!0);if(a.fa&&!a.J)return!1;b&&b.isAllowed()&&(a.da||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.da=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.pb]),a.marketingCloudVisitorID&&(a.V=!0)),a.ga||a.visitorOptedOut||
!b.isOptedOut||(a.ga=!0,a.visitorOptedOut=b.isOptedOut([a,a.vb]),a.visitorOptedOut!=p&&(a.W=!0)),a.aa||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.aa=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.$a]),a.analyticsVisitorID&&(a.S=!0)),a.ca||a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.ca=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.bb]),a.audienceManagerLocationHint&&(a.U=!0)),a.ba||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.ba=
!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.ab]),a.audienceManagerBlob&&(a.T=!0)),c=a.da&&!a.V&&!a.marketingCloudVisitorID,b=a.aa&&!a.S&&!a.analyticsVisitorID,d=a.ca&&!a.U&&!a.audienceManagerLocationHint,f=a.ba&&!a.T&&!a.audienceManagerBlob,e=a.ga&&!a.W,c=c||b||d||f||e?!1:!0);a.ea||a.I||(a.cb(a.za)?a.I=!0:a.ea=!0);a.ea&&!a.I&&(c=!1);return c};a.o=p;a.u=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.zb=c;f.yb=b;f.wb=d;a.o==p&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,
100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.tb(),a.o!=p))for(;0<a.o.length;)c=a.o.shift(),c.yb.apply(c.zb,c.wb)};a.tb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.mb=function(c){var b,d,f=p,e=p;if(!a.isReadyToTrack()){b=[];if(c!=p)for(d in f={},c)f[d]=c[d];e={};a.Ya(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.Gb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),
b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=
a.visitor.getAuthState());a.p("_s");a.mb(c)||(b&&a.R(b),c&&(d={},a.Ya(d,0),a.R(c)),a.Mb()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.Gb()),a.Pb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Za||(f=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=f||void 0===f?void 0===f?"":f:n.document.referrer),
a.Za=1,a.referrer=a.Eb(a.referrer),a.p("_g")),a.Jb()&&!a.abort&&(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),a.Kb(),g+=a.Ib(),a.ob(e,g),a.p("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.Ba=[];a.registerPreTrackCallback=
function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.Ba.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPreTrackCallback")};a.hb=function(c){a.xa(a.Ba,c)};a.Aa=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.Aa.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPostTrackCallback")};a.gb=function(c){a.xa(a.Aa,c)};a.xa=function(c,
b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1];e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.F(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||
"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.ob=function(c,b){var d=a.ib()+"/"+c+"?AQB=1&ndh=1&pf=1&"+(a.ya()?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.hb(d);a.fb(d);a.X()};a.ib=function(){var c=a.jb();return"http"+(a.ssl?"s":"")+"://"+c+"/b/ss/"+a.account+"/"+
(a.mobile?"5.":"")+(a.ya()?"10":"1")+"/JS-"+a.version+(a.Sb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")};a.ya=function(){return a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks};a.jb=function(){var c=a.dc,b=a.trackingServer;b?a.trackingServerSecure&&a.ssl&&(b=a.trackingServerSecure):(c=c?(""+c).toLowerCase():"d1","d1"==c?c="112":"d2"==c&&(c="122"),b=a.lb()+"."+c+".2o7.net");return b};a.lb=function(){var c=a.visitorNamespace;c||(c=a.account.split(",")[0],c=c.replace(/[^0-9a-z]/gi,
""));return c};a.Xa=/{(%?)(.*?)(%?)}/;a.Wb=RegExp(a.Xa.source,"g");a.Db=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Wb),e=0;e<f.length;++e){var g=f[e],h=g.match(a.Xa),k="";"%"==h[1]&&"timezone_offset"==h[2]?k=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(k=a.Hb());d.c=d.c.replace(g,a.escape(k))}}};a.Hb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));
return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,b){return(Array(a+1).join(0)+b).slice(-a)};a.ua={};a.doPostbacks=function(c){if("object"==typeof c)if(a.Db(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);
else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,3)&&(a.ua[d.id]=new Image,a.ua[d.id].alt="",a.ua[d.id].src=d.c)}};a.fb=function(c){a.i||a.Lb();a.i.push(c);a.ma=a.C();a.Va()};a.Lb=function(){a.i=a.Nb();a.i||(a.i=[])};a.Nb=function(){var c,b;if(a.ta()){try{(b=k.localStorage.getItem(a.qa()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ta=function(){var c=!0;a.trackOffline&&
a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.La=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.X=function(){if(a.q&&(a.B&&a.B.complete&&a.B.G&&a.B.wa(),a.q))return;a.Ma=p;if(a.ra)a.ma>a.O&&a.Ta(a.i),a.va(500);else{var c=a.xb();if(0<c)a.va(c);else if(c=a.Ia())a.q=1,a.Ob(c),a.Rb(c)}};a.va=function(c){a.Ma||(c||(c=0),a.Ma=setTimeout(a.X,c))};a.xb=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Ra;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-
c};a.Ia=function(){if(0<a.i.length)return a.i.shift()};a.Ob=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.F(b)}};a.nb=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Z=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.Z=!0,a.Y=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.Y=function(a){return k.$.parseJSON(a)},a.Z=!0):a.Y=function(){return null};a.Rb=function(c){var b,
d,f;a.nb()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Z?b.Da=!0:b=0));!b&&a.Wa&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?
f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||(b.abort=function(){b.src=p}));b.Sa=Date.now();b.Fa=function(){try{b.G&&(clearTimeout(b.G),b.G=0)}catch(a){}};b.onload=b.wa=function(){b.Sa&&(a.na=Date.now()-b.Sa);a.gb(c);b.Fa();a.Bb();a.ha();a.q=0;a.X();if(b.Da){b.Da=!1;try{a.doPostbacks(a.Y(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ja=function(){b.Fa();(a.trackOffline||a.ra)&&a.q&&
a.i.unshift(a.Ab);a.q=0;a.ma>a.O&&a.Ta(a.i);a.ha();a.va(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.wa():b.Ja())};a.Ra=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Pa)try{f.removeChild(a.Pa)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Pa=a.B}b.G=setTimeout(function(){b.G&&
(b.complete?b.wa():(a.trackOffline&&b.abort&&b.abort(),b.Ja()))},5E3);a.Ab=c;a.B=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.K||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.ia=setTimeout(a.ha,a.forcedLinkTrackingTimeout)};a.Bb=function(){if(a.ta()&&!(a.Qa>a.O))try{k.localStorage.removeItem(a.qa()),a.Qa=a.C()}catch(c){}};a.Ta=function(c){if(a.ta()){a.Va();try{k.localStorage.setItem(a.qa(),k.JSON.stringify(c)),a.O=a.C()}catch(b){}}};a.Va=function(){if(a.trackOffline){if(!a.offlineLimit||
0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ia()}};a.forceOffline=function(){a.ra=!0};a.forceOnline=function(){a.ra=!1};a.qa=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.Na=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Sb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==
d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,
cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:k.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf("#");0<=e&&(b=b.substr(0,e)+d);e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}},getIeVersion:function(){if(document.documentMode)return document.documentMode;
for(var a=7;4<a;a--){var b=document.createElement("div");b.innerHTML="\x3c!--[if IE "+a+"]><span></span><![endif]--\x3e";if(b.getElementsByTagName("span").length)return a}return null}};a.H="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.H.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.oa="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.P=a.oa.slice(0);a.Ca="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.P.push("prop"+m)),a.g.push("eVar"+m),a.P.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID".split(" ");a.g=a.g.concat(m);a.H=a.H.concat(m);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
0;a.offlineFilename="AppMeasurement.offline";a.Ra=0;a.ma=0;a.O=0;a.Qa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Wa=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Wa=!0}}catch(x){}a.ha=function(){a.ia&&(k.clearTimeout(a.ia),a.ia=p);a.l&&a.K&&a.l.dispatchEvent(a.K);a.A&&("function"==typeof a.A?a.A():
a.l&&a.l.href&&(a.d.location=a.l.href));a.l=a.K=a.A=0};a.Ua=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ea)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.Ea=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.N&&a.N==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||
a.clickObject.parentNode))a.clickObject=0;else{var h=a.N=a.clickObject;a.la&&(clearTimeout(a.la),a.la=0);a.la=setTimeout(function(){a.N==h&&(a.N=0)},1E4);f=a.La();a.track();if(f<a.La()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Na(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=
new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.K=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&
a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.Ea=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Ua,30)};a.Cb();a.ac||(r?a.setAccount(r):a.F("Error, missing Report Suite ID in AppMeasurement initialization"),a.Ua(),a.loadModule("ActivityMap"))}
function s_gi(r){var a,k=window.s_c_il,p,n,m=r.split(","),s,u,t=0;if(k)for(p=0;!t&&p<k.length;){a=k[p];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(n=a.account?a.account:a.oun,n=a.allAccounts?a.allAccounts:n.split(","),s=0;s<m.length;s++)for(u=0;u<n.length;u++)m[s]==n[u]&&(t=1);p++}t?a.setAccount&&a.setAccount(r):a=new AppMeasurement(r);return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,k,p,n;if(a)for(k=0;k<a.length;k++)p=a[k],n=s_gi(p.oun),n.setAccount(p.un),n.setTagContainer(p.tagContainerName);r.s_giq=0}s_pgicq();